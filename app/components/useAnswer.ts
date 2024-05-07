import { useCallback, useState } from "react";

export type AnswerPart = {
  id: string
  value?: number
  primeFactors?: number[]
}

// firstとsecondで分けたほうが良さそう
export type Answer = {
  first: AnswerPart
  second: AnswerPart
}

export default function useAnswer() {
  const [answer, setAnswer] = useState<Answer>({
    first: {
      id: "",
    },
    second: {
      id: "",
    },
  });

  const resetAnswer = useCallback(() => {
    setAnswer({
      first: {
        id: "",
      },
      second: {
        id: "",
      },
    })
  }, []);

  const checkAnswer = useCallback(({ first, second }: Answer) => {
    return first.primeFactors?.some((f) => second.primeFactors?.includes(f))
  }, [])

  const setFirstAnswerPart = useCallback((first: AnswerPart) => {
    setAnswer(() => ({
      first,
      second: {
        id: "",
      }
    }))
  }, [])

  const setSecondAnswerPart = useCallback((second: AnswerPart) => {
    setAnswer((prev) => ({
      ...prev,
      second
    }))
  }, [])

  return [answer, { resetAnswer, checkAnswer, setFirstAnswerPart, setSecondAnswerPart }] as const;
}
