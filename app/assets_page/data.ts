import { Position } from './columns'; 


// Function to export the data for our table
export async function getData(): Promise<Position[]> {
    // Mock data
    return [
        {
            assetType: 'ETH',
            price: 1920,
            collateralAmount: 4940000000,
            totalBorrow: 4100000000,
            collateralAtRisk: 88510000,
            walletsAtRisk: 13760
        },
        {
            assetType: 'BTC',
            price: 84440,
            collateralAmount: 3910000000,
            totalBorrow: 3030000000,
            collateralAtRisk: 73790000,
            walletsAtRisk: 4890
        },
        {
            assetType: 'stETH',
            price: 2290,
            collateralAmount: 3740000000,
            totalBorrow: 3030000000,
            collateralAtRisk: 28080000,
            walletsAtRisk: 2660
        },
        {
            assetType: 'USDC',
            price: 0.9999,
            collateralAmount: 3660000000,
            totalBorrow: 2840000000,
            collateralAtRisk: 20410000,
            walletsAtRisk: 16120
        },
        {
            assetType: 'USDT',
            price: 0.9998,
            collateralAmount: 3450000000,
            totalBorrow: 2690000000,
            collateralAtRisk: 10890000,
            walletsAtRisk: 4300
        },
        {
            assetType: 'weETH',
            price: 2040,
            collateralAmount: 2990000000,
            totalBorrow: 2380000000,
            collateralAtRisk: 70120000,
            walletsAtRisk: 1330
        },
        {
            assetType: 'cbBTC',
            price: 84200,
            collateralAmount: 941350000,
            totalBorrow: 734250000,
            collateralAtRisk: 32620000,
            walletsAtRisk: 725
        },
        {
            assetType: 'rsETH',
            price: 1990,
            collateralAmount: 782660000,
            totalBorrow: 550540000,
            collateralAtRisk: 3280000,
            walletsAtRisk: 171
        },
        {
            assetType: 'USDS',
            price: 0.9998,
            collateralAmount: 544800000,
            totalBorrow: 307330000,
            collateralAtRisk: 67300000,
            walletsAtRisk: 206
        },
        {
            assetType: 'ezETH',
            price: 1990,
            collateralAmount: 343090000,
            totalBorrow: 2630000,
            collateralAtRisk: 874780,
            walletsAtRisk: 553
        },
        {
            assetType: 'sUSDe',
            price: 1.16,
            collateralAmount: 334340000,
            totalBorrow: 215390000,
            collateralAtRisk: 6510000,
            walletsAtRisk: 200
        },
        {
            assetType: 'osETH',
            price: 2000,
            collateralAmount: 262300000,
            totalBorrow: 196720000,
            collateralAtRisk: 181970,
            walletsAtRisk: 171
        },
        {
            assetType: 'LINK',
            price: 13.82,
            collateralAmount: 223530000,
            totalBorrow: 159700000,
            collateralAtRisk: 4080000,
            walletsAtRisk: 1760
        },
        {
            assetType: 'AAVE',
            price: 172.84,
            collateralAmount: 205340000,
            totalBorrow: 155210000,
            collateralAtRisk: 5860000,
            walletsAtRisk: 1750
        },
        {
            assetType: 'DAI',
            price: 0.9998,
            collateralAmount: 192250000,
            totalBorrow: 143160000,
            collateralAtRisk: 391890,
            walletsAtRisk: 4140
        }
    ];    
}
