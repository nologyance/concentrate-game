import { useEffect } from "react"
import AnswerArea from "~/components/AnswerArea"
import Card from "~/components/Card"
import Lock from "~/components/Lock"
import useAnswer from "~/components/useAnswer"
import useCards, { Cards } from "~/components/useCards"
import useLock from "~/components/useLock"
import useScore from "~/components/useScore"

export default function Index() {
  const [
    answer,
    { resetAnswer, checkAnswer, setFirstAnswerPart, setSecondAnswerPart },
  ] = useAnswer()
  const [score, { incrementScore }] = useScore()
  const [isLocked, { lock, unlock }] = useLock()
  const [cards, { faceUpCardBy, faceDownCardBy, acquire }] = useCards()

  const faceDownAnswered = (cards: Cards) => {
    cards.map((card) => {
      if (card.isOpened && card.id === answer.first.id) {
        faceDownCardBy(card.id)
      }
      if (card.isOpened && card.id === answer.second.id) {
        faceDownCardBy(card.id)
      }
    })
  }

  const handleClick = ({ id, value, primeFactors }: Card) => {
    faceUpCardBy(id)

    if (answer.first.id === "") {
      setFirstAnswerPart({ id, value, primeFactors })
      return
    }
    setSecondAnswerPart({ id, value, primeFactors })
  }

  useEffect(() => {
    if (answer.first.id !== "" && answer.second.id !== "") {
      if (checkAnswer(answer)) {
        // transitionの時間を考慮して1秒待つ
        lock()
        setTimeout(() => {
          alert("正解！")
          acquire(answer.first.id)
          acquire(answer.second.id)
          incrementScore()
          resetAnswer()
          unlock()
        }, 1000)
      } else {
        // transitionの時間を考慮して1秒待つ
        lock()
        setTimeout(() => {
          alert("不正解！")
          faceDownAnswered(cards)
          resetAnswer()
          unlock()
        }, 1000)
      }
    }
  }, [answer, cards])

  useEffect(() => {
    if (cards.every((card) => card.isAcquired)) {
      alert("クリア！")
      // window.location.reload()
    }
  }, [cards])

  return (
    <>
      <Lock isLocked={isLocked} />
      <h2>同じ数で割り切れるペアを探そう</h2>
      <h3>スコア: {score}</h3>
      <div className="flex flex-wrap space-between bg-slate-100">
        {cards.map((card) => (
          <Card key={card.id} {...card} onClick={handleClick} />
        ))}
      </div>
      <div className="flex">
        <AnswerArea {...answer.first} />
        <AnswerArea {...answer.second} />
      </div>
    </>
  )
}
