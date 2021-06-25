import { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket"

import { Ticker } from '../../ticker'
import dogeIconURL from '../../../assets/images/doge-a.png'
import { config } from '../../../config'

const tickerConfig = config.tickers.doge

interface State {
  price: number
}

export const DogeTicker = () => {
  const [state, setState] = useState<State>({
    price: 0,
  })
  const [, setClient] = useState<any>(null)

  const connect = (): W3CWebSocket => {
    const client = new W3CWebSocket(tickerConfig.wsURL)
    client.onopen = () => client.send(JSON.stringify(tickerConfig.connectionOptions))
    client.onmessage = (message) => {
      const payload = JSON.parse(message.data as string)
      const price = payload.data?.p
      if (price) {
        setState({
          ...state,
          price: parseFloat(price)
        })
      }
    }
    client.onclose = (_closeEvent) => {
      return setTimeout(() => {
        const newClient = connect()
        setClient(newClient)
      }, 1000)
    }
    return client
  }

  useEffect(() => {
    const client = connect()
    setClient(client)
  }, [])
  
  return (
    <Ticker
      symbol={'DOGE'}
      significantDigits={tickerConfig.significantDigits}
      iconURL={dogeIconURL}
      buyPriceUSD={tickerConfig.buyPriceUSD}
      priceUSD={state.price}
      startingAmountUSD={tickerConfig.startingAmountUSD}
    />
  )
}
