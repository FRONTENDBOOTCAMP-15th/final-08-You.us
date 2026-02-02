// lib/api/axios.ts
import axios from 'axios'
import useUserStore from '@/lib/zustand/auth/userStore'

// API 서버 주소
const API_SERVER = process.env.NEXT_PUBLIC_API_URL
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || ''
// access token 재발급 URL
const REFRESH_URL = '/auth/refresh'

// Axios 인스턴스 생성 함수
export function getAxiosInstance() {
  const instance = axios.create({
    baseURL: API_SERVER,
    timeout: 1000 * 15,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Client-Id': CLIENT_ID, // Next.js 환경변수
    },
  })

  // 요청 인터셉터 추가
  instance.interceptors.request.use(
    (config) => {
      const { user } = useUserStore.getState()
      if (user && config.url !== REFRESH_URL) {
        config.headers.Authorization = `Bearer ${user.token?.accessToken}`
      }
      config.params = {
        // delay: 500,
        ...config.params,
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // 응답 인터셉터 추가
  instance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      console.error('에러 응답 인터셉터 호출', error)

      const { user, setUser, resetUser } = useUserStore.getState()
      const { config, response } = error

      if (response?.status === 401) {
        // 인증 실패
        if (config.url === REFRESH_URL) {
          // refresh token도 만료된 경우 로그인 페이지로
          navigateLogin()
        } else if (user) {
          // 로그인 했으나 access token이 만료된 경우
          try {
            // localStorage 또는 store의 refreshToken 사용
            const refreshToken =
              localStorage.getItem('refreshToken') || user.token?.refreshToken

            if (!refreshToken) {
              navigateLogin()
              return Promise.reject(error)
            }

            // refresh 토큰으로 access token과 refresh token 재발급 요청
            const {
              data: { accessToken, refreshToken: newRefreshToken },
            } = await instance.get(REFRESH_URL, {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            })

            setUser({
              ...user,
              token: { accessToken, refreshToken: newRefreshToken },
            })

            // 자동 로그인이었으면 localStorage도 업데이트
            if (localStorage.getItem('refreshToken')) {
              localStorage.setItem('refreshToken', newRefreshToken)
            }

            // 갱신된 accessToken으로 실패했던 요청을 다시 시도
            config.headers.Authorization = `Bearer ${accessToken}`
            return axios(config)
          } catch (refreshError) {
            console.error('토큰 갱신 실패:', refreshError)
            resetUser()
            localStorage.removeItem('refreshToken')
            navigateLogin()
            return Promise.reject(refreshError)
          }
        } else {
          // 로그인 안한 경우
          navigateLogin()
        }
      }

      return Promise.reject(error)
    },
  )

  function navigateLogin() {
    const gotoLogin = confirm(
      '로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?',
    )
    if (gotoLogin) {
      // Next.js에서는 window.location 사용
      const currentPath = window.location.pathname
      window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`
    }
  }

  return instance
}

// 싱글톤 인스턴스 export
const apiClient = getAxiosInstance()
export default apiClient
