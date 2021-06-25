import React from 'react'
import styled from 'styled-components'

import {
  DogeTicker,
  SafemoonTicker,
  CakeTicker,
 } from './components/tickers'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 97vh;
  flex-direction: column;
  font-size: 6em;
`

const App: React.FC = () => (
  <Container>
    <DogeTicker />
    <SafemoonTicker />
    <CakeTicker />
  </Container>
)

export default App
