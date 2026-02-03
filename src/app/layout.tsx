import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'

export const metadata: Metadata = {
  title: 'Gift Shop',
  description: 'Find the perfect gift for your loved ones',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="mx-auto max-w-[1500px] min-w-[360px]">
        <Header />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
