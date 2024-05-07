import { useCallback, useState } from 'react'

export default function useLock() {
  const [isLocked, setIsLocked] = useState(false)
  const lock = useCallback(() => setIsLocked((isLocked) => isLocked = true), [])
  const unlock = useCallback(() => setIsLocked((isLocked) => isLocked = false), [])
  return [isLocked, { lock, unlock }] as const
}
