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
      value: 87,
      primeFactors: [3, 29],
    },
    {
      id: "2",
      isOpened: false,
      isAcquired: false,
      value: 111,
      primeFactors: [3, 37],
    },
    {
      id: "3",
      isOpened: false,
      isAcquired: false,
      value: 715,
      primeFactors: [5, 11, 13],
    },
    {
      id: "4",
      isOpened: false,
      isAcquired: false,
      value: 185,
      primeFactors: [5, 37],
    },
    {
      id: "5",
      isOpened: false,
      isAcquired: false,
      value: 259,
      primeFactors: [7, 37],
    },
    {
      id: "6",
      isOpened: false,
      isAcquired: false,
      value: 377,
      primeFactors: [13, 29],
    },
    {
      id: "7",
      isOpened: false,
      isAcquired: false,
      value: 407,
      primeFactors: [11, 37],
    },
    {
      id: "8",
      isOpened: false,
      isAcquired: false,
      value: 333,
      primeFactors: [3, 3, 37],
    },
    {
      id: "9",
      isOpened: false,
      isAcquired: false,
      value: 637,
      primeFactors: [7, 7, 13],
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
