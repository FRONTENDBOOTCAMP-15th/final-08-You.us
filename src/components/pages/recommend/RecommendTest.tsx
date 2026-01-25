'use client'

type Question = {
  question: string
  example: string
}

type Props = {
  step: number
  questions: readonly Question[]
  onDone: (value: string) => void
}

import QuestionBox from '@/components/pages/recommend/QuestionBox'

export default function RecommendTest({ step, questions, onDone }: Props) {
  const current = questions[step]
  if (!current) return null

  return (
    <>
      <h2 className="text-title-lg mt-15 text-gray-900">
        AI에게 선물에 대해 말해주세요!
      </h2>
      <QuestionBox
        key={step}
        question={current.question}
        example={current.example}
        autoFocus
        onDone={onDone}
      />
    </>
  )
}
