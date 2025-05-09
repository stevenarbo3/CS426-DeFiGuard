import express from "express";
import { pino } from "pino";
import { Request, Response } from "express";
import { createMoonwellClient } from "@moonwell-fi/moonwell-sdk";

const PORT = 3000;
const REGISTRY_URL = "http://registry:3000";

const log = pino({ transport: { target: "pino-pretty" } });

const app = express();
app.use(express.json());

const moonwellClient = createMoonwellClient({
  networks: {
    base: {
      rpcUrls: ["https://base.llamarpc.com"],
    },
  },
});

// convert BigInt to string
function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "bigint") return obj.toString();
  if (Array.isArray(obj)) return obj.map(serializeBigInt);
  if (typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, serializeBigInt(value)])
    );
  }
  return obj;
}

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
    const marketData = await moonwellClient.getMarkets({
      chainId: 8453, // Base chain id
    });

    log.info("Fetched market data");

    const response = {
      from: "market-service",
      data: serializeBigInt(marketData),
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (err) {
    log.error(`Failed to fetch market data: ${(err as Error).message}`);
    res.status(500).send("Error fetching market data");
  }
});

app.listen(PORT, () => {
  log.info(`market-service listening on port ${PORT}`);
  registerWithRetry("market-service", `http://market-service:${PORT}`);
});