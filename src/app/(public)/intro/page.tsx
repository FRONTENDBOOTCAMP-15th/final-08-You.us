'use client'

import Link from 'next/link'

export default function IntroPage() {
  const markVisited = () => {
    document.cookie = 'hasVisited=true; path=/; max-age=31536000'
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#F3E7E9]">
      <h1 className="sr-only">인트로 페이지</h1>
      <h2 className="color-gray-900 text-title-lg">선물 추천 쇼핑몰</h2>
      <img src="/icons/LOGO.svg" className="w-112.5" alt="유어스" />
      <h3 className="text-[3rem]">선물 고르기 힘들 때,</h3>
      <h3 className="text-[3rem]">AI에게 선물 추천받자!</h3>
      <div className="flex flex-col gap-4">
        <Link
          href="/recommend"
          className="bg-primary color- rounded-[20px] px-10 py-3.75"
          onClick={markVisited}
        >
          AI에게 선물 추천받기
        </Link>
        <Link href="/" onClick={markVisited}>
          쇼핑몰 둘러보기
        </Link>
      </div>
    </div>
  )
}
