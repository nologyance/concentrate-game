import { useState } from "react"

export default function Index() {
  const [answer, setAnswer] = useState({ left: "", right: "" })
  const handleClick = (e: any) => {
    const currentAnswer = e.target.innerHTML
    if (answer.left === "") {
      setAnswer({ left: currentAnswer, right: "" })
      return
    }
    setAnswer({ ...answer, right: currentAnswer })

    if (answer.left === currentAnswer) {
      console.log("終了！")
    } else {
      console.log("続行！")
    }
  }
  return (
    <>
      <h2> 説明 </h2>
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
