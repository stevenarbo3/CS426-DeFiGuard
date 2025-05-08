import { createMoonwellClient } from "@moonwell-fi/moonwell-sdk";
export async function fetchMarketData() {
    const moonwellClient = createMoonwellClient({
        networks: {
        base: {
      rpcUrls: ["https://base.llamarpc.com"],
    },
    moonbeam: {
      rpcUrls: ["https://moonbeam.public.blastapi.io"],
    },
  },
});
 
  const markets = await moonwellClient.getMarkets();

  const marketData = markets.map((market) => ({
    name: market.underlyingToken.name,
    symbol: market.underlyingToken.symbol,
  }));

  return marketData
}