import { CategoryCode } from '@/types/categoryCode.types';
import { create } from 'zustand';

interface CategoryStoreState {
  categories: CategoryCode[];
  categoryError: boolean;
}

export const useCategoryStore = create<CategoryStoreState>(() => ({
  categories: [],
  categoryError: false,
}));
