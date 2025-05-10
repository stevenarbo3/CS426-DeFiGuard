import express from "express";
import type { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import dns from "dns/promises";
import { pino } from "pino";

dotenv.config();

const app = express();
const PORT = 3001;
const REGISTRY_URL = "http://registry:3000";
const log = pino({ transport: { target: "pino-pretty" } });

app.use(express.json());

let db: Pool;

// Resolve PGHOST to an IPv4 address before connecting
dns.lookup(process.env.PGHOST!, { family: 4 }).then(({ address }) => {
  db = new Pool({
    host: address,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: { rejectUnauthorized: false },
  });

  // Start listening after DB is ready
  app.listen(PORT, () => {
    log.info(`database-service listening on port ${PORT}`);
    registerWithRetry("database-service", `http://database-service:${PORT}`);
    scheduleFetch();
  });
}).catch((err) => {
  log.error(`Failed to resolve DB host: ${err.message}`);
  process.exit(1);
});

// Register this service with the registry (with retry)
async function registerWithRetry(name: string, url: string, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${REGISTRY_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, url }),
      });
      if (res.ok) {
        log.info("Registered with registry");
        return;
      }
    } catch (err) {
      log.warn(`Retry ${i + 1} failed: ${(err as Error).message}`);
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  log.error("Failed to register after retries");
}

// Lookup another service by name
async function lookupService(name: string): Promise<string | null> {
  try {
    const res = await fetch(`${REGISTRY_URL}/lookup?name=${name}`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { url } = await res.json();
    return url;
  } catch (err) {
    log.error(`Lookup failed: ${(err as Error).message}`);
    return null;
  }
}

// POST route for receiving data from the calculation service
app.post("/", (req: Request, res: Response): void => {
  (async () => {
    try {
      const { totals, markets } = req.body.data;

      await db.query("BEGIN");
        // Market total query upload
      await db.query(
        `INSERT INTO market_totals (supply_usd, borrow_usd, tvl_usd, reserves_usd, bad_debt_usd, timestamp)
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [
          totals.totalSupplyUsd,
          totals.totalBorrowUsd,
          totals.totalValueLockedUsd,
          totals.totalReservesUsd,
          totals.badDebtUsd,
        ]
      );
    //   Markets query upload
      for (const market of markets) {
        await db.query(
          `INSERT INTO markets (
              market_key, chain_id, deprecated, collateral_factor, exchange_rate,
              reserve_factor, total_supply_usd, total_borrows_usd, total_reserves_usd,
              bad_debt_usd, underlying_symbol, market_symbol,
              base_borrow_apy, base_supply_apy, total_borrow_apr, total_supply_apr
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
          [
            market.marketKey,
            market.chainId,
            market.deprecated,
            market.collateralFactor,
            market.exchangeRate,
            market.reserveFactor,
            market.totalSupplyUsd,
            market.totalBorrowsUsd,
            market.totalReservesUsd,
            market.badDebtUsd,
            market.underlyingToken?.symbol,
            market.marketToken?.symbol,
            market.baseBorrowApy,
            market.baseSupplyApy,
            market.totalBorrowApr,
            market.totalSupplyApr,
          ]
        );
      }

      await db.query("COMMIT");
      res.status(201).send("Data stored in database");
    } catch (err) {
      await db.query("ROLLBACK");
      console.error("Error saving to DB", err);
      res.status(500).send("Error saving to DB");
    }
  })();
});

// Background polling to call calculation-service and self-post
function scheduleFetch() {
  setInterval(async () => {
    log.info("Scheduled job: calling calculation-service...");

    const calcUrl = await lookupService("calculation-service");
    if (!calcUrl) return;

    try {
      const calcRes = await fetch(calcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!calcRes.ok) throw new Error(`Status ${calcRes.status}`);
      const calcData = await calcRes.json();

      const selfRes = await fetch(`http://localhost:${PORT}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(calcData),
      });

      if (!selfRes.ok) throw new Error(`Self POST failed: ${selfRes.status}`);
      log.info("Data successfully saved to DB");
    } catch (err) {
      log.error(`Scheduled fetch failed: ${(err as Error).message}`);
    }
  }, 3600_000); // Run hourly fetch
}

