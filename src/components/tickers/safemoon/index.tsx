import { Ticker } from '../../ticker'
import { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket"

import safemoonIconURL from '../../../assets/images/safemoon.png'
import { config } from '../../../config'

const tickerConfig = config.tickers.safemoon

interface State {
  price: number
}

export const SafemoonTicker = () => {
  const [state, setState] = useState<State>({
    price: 0,
  })
  const [, setClient] = useState<any>(null)

  const connect = (): W3CWebSocket => {
    const client = new W3CWebSocket(tickerConfig.wsURL)
    client.onopen = () => client.send(JSON.stringify(tickerConfig.connectionOptions))
    client.onmessage = (message) => {
      const payload = JSON.parse(message.data as string)
      const price = payload.d?.cr?.p
      if (price) {
        setState({
          ...state,
          price,
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
      symbol={'SAFEMOON'}
      iconURL={safemoonIconURL}
      significantDigits={tickerConfig.significantDigits}
      buyPriceUSD={tickerConfig.buyPriceUSD}
      priceUSD={state.price}
      startingAmountUSD={tickerConfig.startingAmountUSD}
    />
  )
}
