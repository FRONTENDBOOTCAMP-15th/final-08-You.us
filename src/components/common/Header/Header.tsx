'use client';

import { useState } from 'react';
import MobileHeader from './MobileHeader';
import MobileSidebar from './MobileSidebar';
import DesktopHeader from './DesktopHeader';
import type { CategoryCode } from '@/types/categoryCode.type';

export default function Header({ categories }: { categories: CategoryCode[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-gray-200">
      <h1 className="sr-only">취향에 맞는 선물을 추천해주는 서비스</h1>

      <div className="w-full">
        {/* Mobile */}
        <div className="lg:hidden">
          <MobileHeader
            onMenuOpen={() => setIsMobileMenuOpen(true)}
            isOpen={isMobileMenuOpen}
          />
          <MobileSidebar
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            categories={categories}
          />
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <DesktopHeader categories={categories} />
        </div>
      </div>
    </header>
  );
}
