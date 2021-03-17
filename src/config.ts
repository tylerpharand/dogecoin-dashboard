export const config = {
  wsUri: 'wss://stream.binance.com/stream',
  connectionOptions: {
    id: 2,
    method: 'SUBSCRIBE',
    params: [
      'dogeusdt@aggTrade',
    ]
  },
  user: {
    basePrice: 0.036,
    baseAmount: 1000,
  }
}
