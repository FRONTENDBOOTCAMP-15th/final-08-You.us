'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { setRouter } from '@/lib/router';

export default function RouterProvider() {
  const router = useRouter();

  useEffect(() => {
    setRouter(router);
  }, [router]);

  return null;
}
