import useUserStore from '@/lib/zustand/auth/userStore'
import { ErrorRes } from '@/types/api.types'

const API_SERVER = process.env.NEXT_PUBLIC_API_URL
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || ''
const REFRESH_URL = '/auth/refresh'

interface FetchOptions extends RequestInit {
  params?: Record<string, string>
}

export async function fetchClient<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T | ErrorRes> {
  const { user, setUser, resetUser } = useUserStore.getState()
  const { params, ...fetchOptions } = options

  // Next.js API 라우트인지 확인 (내부 API)
  const isInternalApi = url.startsWith('/api/')

  // URL 설정
  let fullUrl = isInternalApi ? url : `${API_SERVER}${url}`
  if (params) {
    const searchParams = new URLSearchParams(params)
    fullUrl += `?${searchParams.toString()}`
  }

  // 기본 헤더 설정
  const headers = new Headers(fetchOptions.headers)
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  // 외부 API만 Client-Id 추가
  if (!isInternalApi) {
    headers.set('Client-Id', CLIENT_ID)
  }

  // accessToken 추가 (refresh 요청이 아닐 때)
  if (user && url !== REFRESH_URL) {
    headers.set('Authorization', `Bearer ${user.token?.accessToken}`)
  }

  let response: Response

  try {
    // 첫 번째 요청
    response = await fetch(fullUrl, {
      ...fetchOptions,
      headers,
    })
  } catch (error) {
    console.error('fetch 실패:', error)
    throw new Error('네트워크 요청에 실패했습니다.')
  }

  // 401 에러 처리 (토큰 갱신) - 내부 API는 스킵
  if (response.status === 401 && !isInternalApi) {
    // refresh 요청 자체가 401이면 로그아웃
    if (url === REFRESH_URL) {
      navigateLogin()
      throw new Error('인증이 만료되었습니다.')
    }

    // 로그인 상태가 아니면 로그인 페이지로
    if (!user) {
      navigateLogin()
      throw new Error('로그인이 필요합니다.')
    }

    try {
      // localStorage 또는 store의 refreshToken 사용
      const refreshToken =
        localStorage.getItem('refreshToken') || user.token?.refreshToken

      if (!refreshToken) {
        navigateLogin()
        throw new Error('인증 정보가 없습니다.')
      }

      // 토큰 갱신 요청
      const refreshResponse = await fetch(`${API_SERVER}${REFRESH_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Client-Id': CLIENT_ID,
          Authorization: `Bearer ${refreshToken}`,
        },
      })

      if (!refreshResponse.ok) {
        throw new Error('토큰 갱신 실패')
      }

      const refreshData = await refreshResponse.json()
      const { accessToken, refreshToken: newRefreshToken } =
        refreshData.item || refreshData

      // 새 토큰으로 store 업데이트
      setUser({
        ...user,
        token: { accessToken, refreshToken: newRefreshToken },
      })

      // 자동 로그인이었으면 localStorage도 업데이트
      if (localStorage.getItem('refreshToken')) {
        localStorage.setItem('refreshToken', newRefreshToken)
      }

      // 새 accessToken으로 원래 요청 재시도
      headers.set('Authorization', `Bearer ${accessToken}`)
      response = await fetch(fullUrl, {
        ...fetchOptions,
        headers,
      })
    } catch (refreshError) {
      console.error('토큰 갱신 실패:', refreshError)
      resetUser()
      localStorage.removeItem('refreshToken')
      navigateLogin()
      throw refreshError
    }
  }

  const data = await response.json()
  return data as T | ErrorRes
}

function navigateLogin() {
  // 브라우저 환경 체크
  if (typeof window === 'undefined') return

  const gotoLogin = confirm(
    '로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?',
  )
  if (gotoLogin) {
    const currentPath = window.location.pathname
    window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`
  }
}

export default fetchClient
