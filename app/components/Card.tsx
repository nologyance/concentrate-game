import { FC } from "react"

type Card = {
  id: string
  isOpened: boolean
  isAcquired: boolean
  value: number
  primeFactors: number[]
}

type Props = Card & {
  onClick: (card: Card) => void
}

const Card: FC<Props> = ({ id, isOpened, isAcquired, value, primeFactors, onClick }) => {
  const handleClick = () => {
    if (!isOpened) {
      onClick({ id, isOpened, isAcquired,  value, primeFactors })
    }
  }
  return (
    <div
      className={`border-solid border-2 rounded-lg w-16 h-32 perspective-100 preserve-3d transition-80 ${
        isOpened ? "rotate-y-180" : ""
      }`}
      onClick={handleClick}
    >
      <div className="absolute pt-5 bg-red-100 text-center border-solid border-2 rounded-lg w-16 h-32 backfaceVisibility-hidden rotate-y-180">
        {value}
      </div>
      <div className="absolute pt-5 bg-blue-100 text-center border-solid border-2 rounded-lg w-16 h-32 backfaceVisibility-hidden"></div>
    </div>
  )
}

export default Card
