import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { login } from '@/lib/api/users'
import useUserStore from '@/lib/zustand/auth/userStore'
import { LoginProps } from '@/types/login.types'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'

export default function LoginForm({ handleLoginType }: LoginProps) {
  const [autoLogin, setAutoLogin] = useState(false)
  const setUser = useUserStore((state) => state.setUser)
  const setAutoLoginStore = useUserStore((state) => state.setAutoLogin)
  const [userState, formAction, isPending] = useActionState(login, null)
  const router = useRouter()
  const redirect = useSearchParams().get('redirect')

  console.log(autoLogin)
  useEffect(() => {
    if (userState?.ok) {
      setUser({
        _id: userState.item._id,
        email: userState.item.email,
        name: userState.item.name,
        image: userState.item.image,
        phone: userState.item.phone,
        address: userState.item.address,
        token: {
          accessToken: userState.item.token?.accessToken || '',
          refreshToken: userState.item.token?.refreshToken || '',
        },
      })
      // Zustand store에 autoLogin 상태 저장
      setAutoLoginStore(autoLogin)

      // 자동 로그인이면 localStorage에 refreshToken 저장
      if (autoLogin && userState.item.token?.refreshToken) {
        localStorage.setItem('refreshToken', userState.item.token.refreshToken)
      }

      alert(`${userState.item.name}님 로그인이 완료되었습니다.`)
      router.replace(redirect || '/')
    }
  }, [userState, router, redirect, setUser, setAutoLoginStore, autoLogin])

  return (
    <>
      {redirect && ( // 특정 페이지에서 끌려 왔을 경우
        <div className="py-4 text-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            로그인이 필요한 서비스입니다.
          </h3>
        </div>
      )}
      {userState?.ok === 0 && ( // 로그인 실패 메시지 출력
        <div className="py-4 text-center">
          <p className="text-red-500 dark:text-red-400">{userState.message}</p>
        </div>
      )}
      <form action={formAction} className="flex w-fit flex-col">
        <Input
          placeholder="아이디"
          label="아이디"
          className="mb-button-y w-75 lg:w-82.5"
          id="email"
          type="email"
          autoComplete="email"
          name="email"
        />
        <p>{userState?.ok === 0 && userState.errors?.email?.msg}</p>
        <Input
          label="비밀번호"
          id="password"
          type="password"
          name="password"
          placeholder="패스워드"
          className="w-75 lg:w-82.5"
        />
        <div className="mt-2.5 flex w-full items-center justify-between">
          <div className="flex items-center">
            <input
              id="auto-login"
              type="checkbox"
              name="autoLogin"
              checked={autoLogin}
              onChange={(e) => setAutoLogin(e.target.checked)}
              className="peer h-button-y w-button-y checked:bg-primary checked:border-primary appearance-none rounded-[10px] border-2 border-gray-500 bg-gray-50"
            />
            {/* 체크 아이콘 추가 (선택사항) */}
            <svg
              className="h-button-y w-button-y pointer-events-none absolute hidden text-white peer-checked:block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <label htmlFor="auto-login" className="ms-1.25 text-gray-900">
              자동 로그인
            </label>
          </div>

          <button
            type="button"
            className="text-gray-900 underline"
            onClick={handleLoginType}
          >
            소셜 로그인
          </button>
        </div>
        <Button type="submit" className="mt-10 w-full" disabled={isPending}>
          로그인
        </Button>
        <Link
          className="bg-primary mt-button-y hover:bg-primary-hover px-button-x py-button-y w-full cursor-pointer rounded-lg text-center font-bold text-gray-50 transition-colors"
          href="/signup"
        >
          회원가입
        </Link>
      </form>
    </>
  )
}
