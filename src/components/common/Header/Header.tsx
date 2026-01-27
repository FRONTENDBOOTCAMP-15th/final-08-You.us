'use client'

import { useState } from 'react'
import MobileHeader from './MobileHeader'
import MobileSidebar from './MobileSidebar'
import DesktopHeader from './DesktopHeader'

export const categories: string[] = [
  '식품',
  '상품권',
  '뷰티',
  '주얼리',
  '패션잡화',
  '인테리어',
  '문구',
  '가전·디지털',
]

export const categoryData: Record<string, string[]> = {
  식품: ['농축산물', '디저트', '건강식품', '주류'],
  상품권: ['백화점', '편의점', '외식', '영화/문화'],
  뷰티: ['스킨케어', '메이크업', '향수', '헤어케어'],
  주얼리: ['반지', '목걸이', '귀걸이', '팔찌'],
  패션잡화: ['가방', '지갑', '벨트', '모자', '스카프'],
  인테리어: ['가구', '침구', '조명', '수납/정리'],
  문구: ['필기구', '노트', '사무용품', '미술용품'],
  '가전·디지털': ['TV/영상', '주방가전', '생활가전', '계절가전'],
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="border-gray-200 pt-5">
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
          />
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <DesktopHeader />
        </div>
      </div>
    </header>
  )
}
