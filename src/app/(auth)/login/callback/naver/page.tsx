// app/login/callback/naver/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getNaverToken } from '@/lib/api/auth';
import useUserStore from '@/lib/zustand/auth/userStore';

export default function NaverCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useUserStore((state) => state.setUser);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const errorParam = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      // 에러 파라미터가 있는 경우
      if (errorParam) {
        setError(errorDescription || '로그인에 실패했습니다.');
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      // code가 없는 경우
      if (!code) {
        setError('로그인에 실패했습니다.');
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      // state 검증 (CSRF 방지)
      const savedState = sessionStorage.getItem('naver_state');
      if (state !== savedState) {
        setError('잘못된 요청입니다.');
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      try {
        // Server Action 호출하여 토큰 받기
        const result = await getNaverToken(code);

        if (result.ok) {
          // 사용자 정보 저장
          setUser({
            _id: '', // 네이버 로그인은 _id가 없을 수 있음
            email: result.user.email,
            name: result.user.name,
            image: result.user.image,
            phone: '',
            address: '',
            token: {
              accessToken: '',
              refreshToken: '',
            },
          });

          // state 정리
          sessionStorage.removeItem('naver_state');

          alert(`${result.user.name}님 로그인 성공!`);
          router.push('/');
        } else {
          setError(result.message || '로그인에 실패했습니다.');
          setTimeout(() => router.push('/login'), 2000);
        }
      } catch (error) {
        console.error('네이버 로그인 오류:', error);
        setError('로그인 중 오류가 발생했습니다.');
        setTimeout(() => router.push('/login'), 2000);
      }
    };

    handleCallback();
  }, [searchParams, router, setUser]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        {error ? (
          <>
            <p className="text-lg text-red-500">{error}</p>
            <p className="mt-2 text-sm text-gray-500">
              잠시 후 로그인 페이지로 이동합니다...
            </p>
          </>
        ) : (
          <p className="text-lg">네이버 로그인 중...</p>
        )}
      </div>
    </div>
  );
}
