'use client';

import { useState } from 'react';
import MobileHeader from './MobileHeader';
import MobileSidebar from './MobileSidebar';
import DesktopHeader from './DesktopHeader';
import type { CategoryCode } from '@/types/categoryCode.type';

export default function HeaderClient({
  categories,
}: {
  categories: CategoryCode[];
}) {}
