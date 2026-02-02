import LoginForm from '@/app/(auth)/login/LoginForm'
import type { LoginProps } from '@/types/login.types'
import Image from 'next/image'

export default function NormalLogin({ handleLoginType }: LoginProps) {
  return (
    <div className="container mx-auto flex h-screen w-fit flex-col items-center justify-center">
      <h1 className="sr-only">로그인 페이지</h1>
      <Image
        src="/icons/LOGO.svg"
        className="mb-15 w-70"
        alt="유어스"
        width={250}
        height={81}
      />
      <LoginForm handleLoginType={handleLoginType} />
    </div>
  )
}
