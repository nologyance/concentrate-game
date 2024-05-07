import { useCallback, useState } from 'react'
import Card from './Card'

export type Cards = Card[]

export default function useLock() {
  const [cards, setCards] = useState<Cards>([
    {
      id: "0",
      isOpened: false,
      isAcquired: false,
      value: 51,
      primeFactors: [3, 17],
    },
    {
      id: "1",
      isOpened: false,
      isAcquired: false,
      value: 85,
      primeFactors: [5, 17],
    },
    {
      id: "2",
      isOpened: false,
      isAcquired: false,
      value: 3,
      primeFactors: [3],
    },
    {
      id: "3",
      isOpened: false,
      isAcquired: false,
      value: 9,
      primeFactors: [3, 3],
    },
    {
      id: "4",
      isOpened: false,
      isAcquired: false,
      value: 5,
      primeFactors: [5],
    },
    {
      id: "5",
      isOpened: false,
      isAcquired: false,
      value: 25,
      primeFactors: [5, 5],
    },
  ])

  // もうちょっとなんとかならないか
  const faceUpCardBy = useCallback((cardId: string) => {
    const toFaceUp = (cards: Cards) => cards.map((card) => {
      if (card.id === cardId) {
        return faceUpCard(card)
      }
      return card
    })
    setCards(prevCards => toFaceUp(prevCards))
  }, [cards])

  const faceDownCardBy = useCallback((cardId: string) => {
    const toFaceDown = (cards: Cards) => cards.map((card) => {
      if (card.id === cardId) {
        return faceDownCard(card)
      }
      return card
    })
    setCards(prevCards => toFaceDown(prevCards))
  }, [cards])

  const acquireCardBy = useCallback((cardId: string) => {
    const toAcquired = (cards: Cards) =>
      cards.map((card) => {
        if (card.id === cardId) {
          return acquireCard(card)
        }
        return card
      })
    setCards(prevCards => toAcquired(prevCards))
  }, [cards])

  return [cards, { faceUpCardBy, faceDownCardBy, acquire: acquireCardBy }] as const
}

const faceUpCard = (card: Card): Card => {
  return { ...card, isOpened: true }
}

const faceDownCard = (card: Card): Card => {
  return { ...card, isOpened: false }
}

const acquireCard = (card: Card): Card => {
  return { ...card, isAcquired: true }
}
