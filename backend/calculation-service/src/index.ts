import express from "express";
import { pino } from "pino";
import { Request, Response } from "express";
import { createMoonwellClient } from "@moonwell-fi/moonwell-sdk";

const PORT = 3000;
const REGISTRY_URL = "http://registry:3000";

const log = pino({ transport: { target: "pino-pretty" } });

const app = express();
app.use(express.json());


// Retry logic for registry
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
      log.warn(
        `Failed to register (attempt ${i + 1}): ${(err as Error).message}`
      );
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

app.post("/", async (_req: Request, res: Response) => {
  try {
    // fetch market data from market-service
    const marketServiceUrl = await lookupService("market-service");
    if (!marketServiceUrl) {
      return res.status(502).send("Could not resolve market-service");
    }
    const marketResponse = await fetch(marketServiceUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!marketResponse.ok) {
      throw new Error(`Failed to fetch market data: ${marketResponse.status}`);
    }
    const marketData = await marketResponse.json();
    log.info('Fetched market data via market-service');
    const markets = marketData.data || [];
    let totalSupplyUsd = 0;
    let totalBorrowUsd = 0;
    let totalValueLockedUsd = 0;
    let totalReservesUsd = 0;
    let badDebtUsd = 0;

    // Iterate through all markets to calculate totals
    for (const market of markets) {
      if (market.totalSupplyUsd) {
        totalSupplyUsd += market.totalSupplyUsd;
      }
      if (market.totalBorrowsUsd) {
        totalBorrowUsd += market.totalBorrowsUsd;
      }
      if (market.totalReservesUsd) {
        totalReservesUsd += market.totalReservesUsd;
      }
      if (market.badDebtUsd) {
        badDebtUsd += market.badDebtUsd;
      }
    }

    totalValueLockedUsd = totalSupplyUsd - totalBorrowUsd;

    log.info(`Calculated totals: Supply USD: ${totalSupplyUsd}, Borrow USD: ${totalBorrowUsd}, TVL USD: ${totalValueLockedUsd}, Reserves USD: ${totalReservesUsd}, Bad Debt: ${badDebtUsd}`);

    const response = {
      from: "calculation-service",
      data: {
        markets: marketData.data,
        totals: {
          totalSupplyUsd,
          totalBorrowUsd,
          totalValueLockedUsd,
          totalReservesUsd, 
          badDebtUsd,
        }
      },
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (err) {
    log.error(`Error contacting market-service: ${(err as Error).message}`);
    res.status(500).send("Error contacting market-service");
  }
});

app.listen(PORT, () => {
  log.info(`calculation-service listening on port ${PORT}`);
  registerWithRetry("calculation-service", `http://calculation-service:${PORT}`);
});
