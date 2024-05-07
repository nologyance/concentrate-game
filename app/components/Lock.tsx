import { FC } from "react"
import useLock from "./useLock"

type Props = {
  isLocked: boolean
}

const Lock: FC<Props> = ({ isLocked }) => {
  return (
    <>
      {isLocked && (
        <div className="fixed h-full w-full z-50 bg-gray-100/50 items-center justify-center flex">
          <div className="fixed animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
        </div>
      )}
    </>
  )
}

export default Lock
