import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PercentGain = styled.div<{ isGain: boolean }>`
  font-size: 0.8em;
  animation: ${({ isGain }) => isGain ? 'colorRotate 3s linear 0s infinite' : 'unset'};
  color: red;

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

const Icon = styled.div<{ iconURL: string }>`
  background-image: url(${({ iconURL }) => iconURL});
  background-size: cover;
  background-repeat: no-repeat;
  width: 1.5em;
  height: 1.5em;
`

const Price = styled.div<{ scale: number }>`
  color: yellow;
  margin: 0em 0.3em 0em 0em;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  font-size: ${({ scale }) => `${scale}em`};
`

interface Props {
  symbol: string
  significantDigits: number
  priceUSD: number
  iconURL: string
  buyPriceUSD: number
  startingAmountUSD: number
}

const formatPercentGain = (percentGain: number) => {
  return `${percentGain >= 0 ? '+' : '-'}${Math.abs(Math.round(percentGain))}%`
}

const formatPrice = (price: number, significantDigits: number) => {
  return `$${price.toFixed(significantDigits)}`
}

export const Ticker = ({
  iconURL,
  significantDigits,
  priceUSD,
  buyPriceUSD = 1,
}: Props) => {
  const percentGain = (priceUSD / buyPriceUSD - 1) * 100
  return (
    <Container>
      <Price
        scale={25 / (significantDigits + 20)}
      >
        {formatPrice(priceUSD, significantDigits)}
      </Price>
      <Icon iconURL={iconURL} />
      <PercentGain
        isGain={percentGain >= 0}
      >
        {formatPercentGain(percentGain)}
      </PercentGain>
    </Container>
  )
}