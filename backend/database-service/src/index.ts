import express, { Request, Response } from "express";
import { pino } from "pino";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;
const REGISTRY_URL = "http://registry:3000";

const log = pino({ transport: { target: "pino-pretty" } });

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function registerWithRetry(name: string, url: string, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(`${REGISTRY_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, url }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      log.info("Registered with registry");
      return;
    } catch (err) {
      log.warn(`Failed to register (attempt ${i + 1}): ${(err as Error).message}`);
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  log.error("Could not register with registry. Exiting.");
  process.exit(1);
}

async function lookupService(name: string): Promise<string | null> {
    try {
      const res = await fetch(`${REGISTRY_URL}/lookup?name=${name}`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const { url } = await res.json();
      return url;
    } catch (err) {
      log.error(`Lookup failed for ${name}: ${(err as Error).message}`);
      return null;
    }
  }

app.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    log.info("Received data to store in DB");
    const { totals, markets } = body.data;

    await db.query("BEGIN");

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
            market.totalSupplyApr
          ]
        );
      }

    await db.query("COMMIT");
    res.status(201).send("Data stored in database");
  } catch (err) {
    await db.query("ROLLBACK");
    log.error(`Error saving to DB: ${(err as Error).message}`);
    res.status(500).send("Error saving to DB");
  }
});

app.listen(PORT, () => {
    log.info(`database-service listening on port ${PORT}`);
    registerWithRetry("database-service", `http://database-service:${PORT}`);
  
    // Schedule to run once per hour (3600_000 ms)
    setInterval(async () => {
      log.info("Scheduled job: calling calculation-service...");
  
      const calcUrl = await lookupService("calculation-service");
      if (!calcUrl) {
        log.error("Could not resolve calculation-service");
        return;
      }
  
      try {
        const calcRes = await fetch(calcUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!calcRes.ok) throw new Error(`Status ${calcRes.status}`);
  
        const calcData = await calcRes.json();
  
        // Now send it to self (i.e., to the database-service POST endpoint)
        const selfRes = await fetch(`http://localhost:${PORT}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(calcData),
        });
  
        if (!selfRes.ok) throw new Error(`DB save failed: ${selfRes.status}`);
        log.info("Data successfully fetched and stored to DB");
      } catch (err) {
        log.error(`Scheduled fetch failed: ${(err as Error).message}`);
      }
    }, 3600_000); // every 1 hour (in ms)
  });
  
