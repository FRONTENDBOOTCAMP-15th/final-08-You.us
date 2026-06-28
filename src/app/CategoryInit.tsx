'use client';

import { useCategoryStore } from '@/lib/zustand/categoryStore';
import type { CategoryCode } from '@/types/categoryCode.types';
import { useEffect, useRef } from 'react';

export default function CategoryInit({
  categories,
  categoryError,
}: {
  categories: CategoryCode[];
  categoryError: boolean;
}) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      useCategoryStore.setState({ categories, categoryError });
      initialized.current = true;
    }
  }, [categories, categoryError]);

  return null;
}
