'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getNaverToken } from '@/lib/api/auth';
import useUserStore from '@/lib/zustand/auth/userStore';
import { mergeLocalCartToServer } from '@/lib/zustand/cartStore';

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

      if (errorParam) {
        setError(errorDescription || '로그인에 실패했습니다.');
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      if (!code) {
        setError('로그인에 실패했습니다.');
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      const savedState = sessionStorage.getItem('naver_state');
      if (state !== savedState) {
        setError('잘못된 요청입니다.');
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      try {
        console.log('콜백 페이지: getNaverToken 호출');
        const result = await getNaverToken(code);

        console.log('콜백 페이지: result =', result);
        console.log('result.ok =', result.ok);
        console.log('result.user =', result.user);

        if (result.ok && result.user) {
          console.log('로그인 성공, 사용자 정보 저장');
          setUser(result.user);

          sessionStorage.removeItem('naver_state');

          await mergeLocalCartToServer();

          // 저장된 경로로 이동 (없으면 홈으로)
          const redirectPath =
            sessionStorage.getItem('redirect_after_login') || '/';
          sessionStorage.removeItem('redirect_after_login');

          alert(`${result.user.name}님 로그인 성공!`);
          router.push(redirectPath);
        } else {
          console.error('로그인 실패:', result);
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
