
interface Config {
  tickers: {
    [name: string]: {
      symbol: string
      significantDigits: number
      buyPriceUSD: number
      startingAmountUSD: number
      wsURL: string
      connectionOptions: object
    }
  }
}

export const config: Config = {
  tickers: {
    doge: {
      symbol: 'DOGE',
      significantDigits: 3,
      buyPriceUSD: 0.0655,
      startingAmountUSD: 1000,
      wsURL: 'wss://stream.binance.com/stream',
      connectionOptions: {
        id: 2,
        method: 'SUBSCRIBE',
        params: [
          'dogeusdt@aggTrade',
        ]
      },
    },
    safemoon: {
      symbol: 'SAFEMOON',
      significantDigits: 9,
      buyPriceUSD: 0.00000843,
      startingAmountUSD: 1220.5,
      wsURL: 'wss://stream.coinmarketcap.com/price/latest',
      connectionOptions: {
        data: {
          cryptoIds: [8757],
          index: 'detail',
        },
        id: 'price',
        method: 'subscribe'
      }
    },
    cake: {
      symbol: 'CAKE',
      significantDigits: 2,
      buyPriceUSD: 27.75,
      startingAmountUSD: 1220.5,
      wsURL: 'wss://stream.coinmarketcap.com/price/latest',
      connectionOptions: {
        data: {
          cryptoIds: [7186],
          index: 'detail',
        },
        id: 'price',
        method: 'subscribe'
      }
    }
  }
}
