'use client';

import LoginForm from '@/app/(auth)/login/LoginForm';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="container mx-auto flex h-screen w-fit flex-col items-center justify-center">
      <h1 className="sr-only">로그인 페이지</h1>
      <Link href="/">
        <Image
          src="/icons/LOGO.svg"
          className="mb-15 w-70"
          alt="유어스"
          width={250}
          height={81}
        />
      </Link>
      <LoginForm />
    </div>
  );
}
