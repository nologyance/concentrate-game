import { useState } from "react"

type Answer = {
  left: string
  right: string
}

export default function Index() {
  const [answer, setAnswer] = useState<Answer>({ left: "", right: "" })
  const [score, setScore] = useState(0)

  const handleClick = (e: any) => {
    const currentAnswer = e.target.innerHTML
    if (answer.left === "") {
      setAnswer({ left: currentAnswer, right: "" })
      return
    }
    setAnswer({ ...answer, right: currentAnswer })

    if (answer.left === currentAnswer) {
      alert("正解！")
      setScore(score + 1)
      // window.location.reload()
    } else {
      console.log("不正解！")
      setAnswer({ left: "", right: "" })
    }
  }

  return (
    <>
      <h2>説明</h2>
      <h3>スコア: {score}</h3>
      <div className="flex space-between bg-slate-100">
        <div
          className="h-24 w-24 border-solid border-2 bg-white"
          onClick={handleClick}
        >
          51
        </div>
        <div
          className="h-24 w-24 border-solid border-2 bg-white"
          onClick={handleClick}
        >
          85
        </div>
      </div>
      <div className="flex">
        {answer.left && (
          <>
            <div className="h-24 w-24 border-solid border-2 bg-white">
              <p>{answer.left}</p>
            </div>
            <div className="h-24 w-24 border-solid border-2 bg-white">
              <p>{answer.right}</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}
