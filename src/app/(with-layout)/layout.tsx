import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'

export default function WithLayoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-375 min-w-90">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  )
}
