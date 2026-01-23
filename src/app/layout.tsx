import type { Metadata } from 'next'
import './globals.css'

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
      <body>
        <div className="mx-auto max-w-[1500px] min-w-[1025px] px-5">
          {children}
        </div>
      </body>
    </html>
  )
}
