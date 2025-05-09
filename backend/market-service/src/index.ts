import express from 'express';
import { createMoonwellClient } from "@moonwell-fi/moonwell-sdk";
import axios from 'axios'

const app = express();

app.use(express.json());

async function fetchMarketData() {
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

  return marketData;
}

// endpoint to fetch market data
app.get('/markets', async (req, res) => {
  
  try {
    const marketData = await fetchMarketData()

    const response = await axios.post(`http://calculation-service:${PORT}/market-data`, {
      data: marketData,
    })

    res.json({ status: 'sent', response: response.data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch or forward market data' })
  }
});

const PORT = 3000;
app.listen(PORT, (err: Error) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});