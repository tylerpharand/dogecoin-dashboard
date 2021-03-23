import React, { useEffect, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket"
import styled from 'styled-components'

import doge from './assets/images/doge-a.png'
import { config } from './config'

const Row = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Percentage = styled.div`
  font-size: 70px;
  animation: colorRotate 3s linear 0s infinite;

  @keyframes colorRotate {
    from {
      color: #6666ff;
    }
    10% {
      color: #0099ff;
    }
    50% {
      color: #00ff00;
    }
    75% {
      color: #ff3399;
    }
    100% {
      color: #6666ff;
    }
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 97vh;
`

const Ticker = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
`

const DogeThumbnail = styled.div`
  background-image: url(${doge});
  background-size: cover;
  background-repeat: no-repeat;
  width: 9em;
  height: 9em;
`

const Price = styled.div`
  color: yellow;
  margin: 0em 0.3em 0em 0em;
  font-size: 7em;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
`

interface State {
  price: number
  error?: Error
}

const App: React.FC = () => {
  const [state, setState] = useState<State>({
    price: 0,
  })
  const [client, setClient] = useState<any>(null)

  const connect = (): W3CWebSocket => {
    const client = new W3CWebSocket(config.wsUri)
    client.onopen = () => client.send(JSON.stringify(config.connectionOptions))
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
    <Container>
      <Ticker>
        <Row>
          <Price>
            {`$${state.price.toFixed(4)}`}
          </Price>
          <DogeThumbnail />
          <Percentage>
            {
              state.price > config.user.basePrice
                ? `+${Math.round((state.price / config.user.basePrice - 1) * 100)}%`
                : `-${Math.round((config.user.basePrice / state.price - 1) * 100)}%`
            }
          </Percentage>
        </Row>
      </Ticker>
    </Container>
  )
}

export default App
