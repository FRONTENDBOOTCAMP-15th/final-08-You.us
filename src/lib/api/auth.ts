// lib/api/auth.ts
'use server'

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET
const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI

interface NaverTokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

interface NaverUserResponse {
  resultcode: string
  message: string
  response: {
    id: string
    email: string
    name: string
    profile_image?: string
  }
}

/**
 * 네이버 로그인 처리
 * @param code - 네이버에서 받은 인증 코드
 */
export async function getNaverToken(code: string) {
  try {
    // 1. code로 액세스 토큰 받기
    const tokenResponse = await fetch('https://nid.naver.com/oauth2.0/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: NAVER_CLIENT_ID!,
        client_secret: NAVER_CLIENT_SECRET!,
        code: code,
        redirect_uri: NAVER_REDIRECT_URI!,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('토큰 발급 실패')
    }

    const tokenData: NaverTokenResponse = await tokenResponse.json()

    // 2. 액세스 토큰으로 사용자 정보 가져오기
    const userResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      throw new Error('사용자 정보 조회 실패')
    }

    const userData: NaverUserResponse = await userResponse.json()

    return {
      ok: 1,
      user: {
        email: userData.response.email,
        name: userData.response.name,
        image: userData.response.profile_image || '',
        // 필요한 다른 정보들 추가
      },
    }
  } catch (error) {
    console.error('네이버 로그인 오류:', error)
    return {
      ok: 0,
      message: '네이버 로그인에 실패했습니다.',
    }
  }
}
