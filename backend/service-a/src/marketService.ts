import { fetchMarketData } from './fetchMarketData'
import { supabase } from './supabaseClient'

export async function fetchAndStoreMarketData() {
  const marketData = await fetchMarketData()

  const { data, error } = await supabase
    .from('market_data')
    .insert(marketData)

  if (error) {
    console.error('Failed to insert market data:', error)
  } else {
    console.log('Inserted market data:', data)
  }
}

fetchAndStoreMarketData()