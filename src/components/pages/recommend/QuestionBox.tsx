'use client'

import Button from '@/components/common/Button'
import { useEffect, useRef, useState } from 'react'

type Props = {
  question: string
  example?: string
  autoFocus?: boolean
  onDone: (value: string) => void
}

export default function QuestionBox({
  question,
  example,
  autoFocus,
  onDone,
}: Props) {
  const [value, setValue] = useState('')
  const [enter, setEnter] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => setEnter(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  return (
    <div
      className={[
        'card border-primary mt-15 h-100 w-135 overflow-hidden rounded-[40px] border bg-gray-50',
        'transition duration-800 ease-out',
        enter ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
      ].join(' ')}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onDone(value)
          setValue('') // 다음 step에서 key로 리셋되긴 하지만 안전하게
        }}
        autoComplete="off"
      >
        <fieldset className="flex flex-col items-center">
          <legend className="sr-only">선물 추천 질문</legend>

          <h2 className="bg-primary text-body-lg flex h-32 w-full items-center justify-center font-bold text-gray-50">
            {question}
          </h2>

          {example && (
            <h3 className="text-body-md text-gray-90 my-8.75 font-bold">
              {example}
            </h3>
          )}

          <label htmlFor="answer" className="sr-only">
            답변
          </label>
          <input
            ref={inputRef}
            id="answer"
            name="answer"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="질문에 대한 답을 적어주세요."
            className="border-primary text-primary w-82.5 rounded-[10px] border-2 bg-gray-50 p-2.5 outline-0"
            autoComplete="off"
          />

          <Button type="submit" className="mt-7.5 leading-4">
            입력
          </Button>
        </fieldset>
      </form>
    </div>
  )
}
