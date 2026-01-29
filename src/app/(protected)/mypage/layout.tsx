import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import QuickMenu from '@/components/pages/mypage/main/QuickMenu'
import Image from 'next/image'
import Link from 'next/link'

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <figcaption className="bg-gray-50">
      <Header />
      <div className="mx-auto flex w-full max-w-375 flex-row justify-center px-4">
        <QuickMenu />
        {/* AuthGuard, 사용자 정보 표시 */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <Footer />
    </figcaption>
  )
}
