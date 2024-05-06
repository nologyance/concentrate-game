import { useEffect, useState } from "react"
import Card from "~/components/Card"

type Answer = {
  left: {
    id: string
    value?: number
    primeFactors?: number[]
  }
  right: {
    id: string
    value?: number
    primeFactors?: number[]
  }
}

type Cards = Card[]

export default function Index() {
  const [isLocked, setIsLocked] = useState(false)
  const [answer, setAnswer] = useState<Answer>({
    left: {
      id: "",
    },
    right: {
      id: "",
    },
  })
  const [cards, setCards] = useState<Cards>([
    { id: "0", isOpened: false, isAcquired: false, value: 51, primeFactors: [3, 17] },
    { id: "1", isOpened: false, isAcquired: false,  value: 85, primeFactors: [5, 17] },
    { id: "2", isOpened: false, isAcquired: false,  value: 3, primeFactors: [3] },
    { id: "3", isOpened: false, isAcquired: false,  value: 9, primeFactors: [3, 3] },
    { id: "4", isOpened: false, isAcquired: false,  value: 5, primeFactors: [5] },
    { id: "5", isOpened: false, isAcquired: false,  value: 25, primeFactors: [5, 5] },
  ])
  const [score, setScore] = useState(0)

  const faceUp = (cardId: string) => {
    const newCards = cards.map((card) => {
      if (card.id === cardId) {
        return { ...card, isOpened: true }
      }
      return card
    })
    setCards(newCards)
  }

  const acquire = (cardId: string) => {
    const toAcquired = (cards: Cards) => cards.map((card) => {
      if (card.id === cardId) {
        return { ...card, isAcquired: true }
      }
      return card
    })
    setCards((cards) => toAcquired(cards))
  }

  const faceDownAnswered = (cards: Cards) => {
    const newCards = cards.map((card) => {
      if (answer.left.id === card.id || answer.right.id === card.id) {
        return { ...card, isOpened: false }
      }
      return card
    })
    setCards(newCards)
  }

  const addScore = (score: number) => {
    setScore(score + 1)
  }

  const resetAnswer = () => {
    setAnswer({
      left: {
        id: "",
      },
      right: {
        id: "",
      },
    })
  }

  const checkAnswer = ({ left, right }: Answer) => {
    return left.primeFactors?.some((f) => right.primeFactors?.includes(f))
  }

  // IDから引き直さなくて良いはず
  const handleClick = (cardId: string) => {
    faceUp(cardId)

    if (answer.left.id === "") {
      setAnswer({
        left: {
          id: cardId,
          value: cards.find((card) => card.id === cardId)!.value,
          primeFactors: cards.find((card) => card.id === cardId)!.primeFactors,
        },
        right: {
          id: "",
          value: 0,
          primeFactors: [],
        },
      })
      return
    }
    setAnswer({
      ...answer,
      right: {
        id: cardId,
        value: cards.find((card) => card.id === cardId)!.value,
        primeFactors: cards.find((card) => card.id === cardId)!.primeFactors,
      },
    })
  }

  useEffect(() => {
    if (answer.left.id !== "" && answer.right.id !== "") {
      if (checkAnswer(answer)) {
        // transitionの時間を考慮して1秒待つ
        setIsLocked(true)
        setTimeout(() => {
          alert("正解！")
          acquire(answer.left.id)
          acquire(answer.right.id)
          addScore(score)
          resetAnswer()
          setIsLocked(false)
        }, 1000)
        // window.location.reload()
      } else {
        // transitionの時間を考慮して1秒待つ
        setIsLocked(true)
        setTimeout(() => {
          alert("不正解！")
          faceDownAnswered(cards)
          resetAnswer()
          setIsLocked(false)
        }, 1000)
      }
    }
  }, [answer, cards])

  useEffect(() => {
    // scoreが変わったときでも良さそう
    if (cards.every((card) => card.isAcquired)) {
      alert("クリア！")
      // window.location.reload()
    }
  }, [cards])

  return (
    <>
      {isLocked && (
        <div className="fixed h-full w-full z-50 bg-gray-100/50 items-center justify-center flex">
          <div className="fixed animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
        </div>
      )}
      <h2>説明</h2>
      <h3>スコア: {score}</h3>
      <div className="flex space-between bg-slate-100">
        {cards.map((card) => (
          <Card key={card.id} {...card} onClick={handleClick} />
        ))}
      </div>
      <div className="flex">
        {answer.left.value && (
          <>
            <div className="h-24 w-24 border-solid border-2 bg-white">
              {answer.left.value}
            </div>
            <div className="h-24 w-24 border-solid border-2 bg-white">
              {answer.right.value}
            </div>
          </>
        )}
      </div>
    </>
  )
}
