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
  const [answer, setAnswer] = useState<Answer>({
    left: {
      id: "",
    },
    right: {
      id: "",
    },
  })
  const [cards, setCards] = useState<Cards>([
    { id: "0", isOpened: false, value: 51, primeFactors: [3, 17] },
    { id: "1", isOpened: false, value: 85, primeFactors: [5, 17] },
    { id: "2", isOpened: false, value: 3, primeFactors: [3] },
    { id: "3", isOpened: false, value: 9, primeFactors: [3, 3] },
    { id: "4", isOpened: false, value: 5, primeFactors: [5] },
    { id: "5", isOpened: false, value: 25, primeFactors: [5, 5] },
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

  const checkAnswer = ({left, right}: Answer) => {
    return left.primeFactors?.some((f) =>
      right.primeFactors?.includes(f)
    )
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
      ...answer, right: {
        id: cardId,
        value: cards.find((card) => card.id === cardId)!.value,
        primeFactors: cards.find((card) => card.id === cardId)!.primeFactors,
    } })
  }

  useEffect(() => {
    if (answer.left.id !== "" && answer.right.id !== "") {
      if (checkAnswer(answer)) {
        alert("正解！")
        addScore(score)
        resetAnswer()
        // window.location.reload()
      } else {
        alert("不正解！")
        faceDownAnswered(cards)
        resetAnswer()
      }
    }
  }, [answer])

  useEffect(() => {
    // scoreが変わったときでも良さそう
    if (cards.every((card) => card.isOpened)) {
      alert("クリア！")
      // window.location.reload()
    }
  }, [cards])

  return (
    <>
      <h2>説明</h2>
      <h3>スコア: {score}</h3>
      <div className="flex space-between bg-slate-100">
        {cards.map((card) => (
          <Card key={card.id} {...card} onClick={handleClick}/>
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
