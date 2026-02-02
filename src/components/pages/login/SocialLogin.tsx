// components/SocialLogin.tsx
'use client'

import type { LoginProps } from '@/types/login.types'
import { getNaverLoginUrl } from '@/lib/auth/naver'
import Image from 'next/image'

export default function SocialLogin({ handleLoginType }: LoginProps) {
  // 네이버 로그인 핸들러
  const handleNaverLogin = () => {
    const naverLoginUrl = getNaverLoginUrl()
    window.location.href = naverLoginUrl
  }

  // 카카오 로그인 핸들러 (나중에 구현)
  const handleKakaoLogin = () => {
    alert('카카오 로그인은 준비중입니다.')
  }

  // 구글 로그인 핸들러 (나중에 구현)
  const handleGoogleLogin = () => {
    alert('구글 로그인은 준비중입니다.')
  }

  return (
    <div className="container mx-auto flex h-screen w-75 flex-col items-center justify-center lg:w-82.5">
      <h1 className="sr-only">로그인 페이지</h1>
      <Image
        src="/icons/LOGO.svg"
        className="mb-16 w-70"
        width={250}
        height={81}
        alt="유어스"
      />
      <button
        onClick={handleNaverLogin}
        className="px-button-x py-button-y w-full cursor-pointer rounded-lg bg-[#03C75A] text-center font-bold text-gray-50 transition-colors hover:bg-[#02B350]"
      >
        네이버 로그인
      </button>
      <button
        onClick={handleKakaoLogin}
        className="px-button-x py-button-y mt-8.75 w-full cursor-pointer rounded-lg bg-[#F4E347] text-center font-bold text-gray-900 transition-colors hover:bg-[#E5D63F]"
      >
        카카오톡 로그인
      </button>
      <button
        onClick={handleGoogleLogin}
        className="px-button-x py-button-y mt-8.75 w-full cursor-pointer rounded-lg bg-[#5C83EE] text-center font-bold text-gray-50 transition-colors hover:bg-[#4A72DC]"
      >
        구글 로그인
      </button>
      <button
        className="mt-8.75 text-gray-900 underline"
        onClick={handleLoginType}
      >
        일반 로그인
      </button>
    </div>
  )
}
