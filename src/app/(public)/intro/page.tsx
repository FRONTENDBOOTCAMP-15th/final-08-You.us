'use client'

import { useRouter } from 'next/navigation'

export default function IntroPage() {
    const router = useRouter()

  const markVisited = () => {
    localStorage.setItem('hasVisited', 'true')
  }

  const goToTest = () => {
    markVisited()
    router.push('/recommend')
  }

  const goToMain = () => {
    markVisited()
    router.push('/')
  }

  return (
    <div>
      <h1>인트로 페이지</h1>
      <button onClick={goToTest}>테스트 하러 가기</button>
      <button onClick={goToMain}>메인으로 가기</button>
    </div>
  )

}
