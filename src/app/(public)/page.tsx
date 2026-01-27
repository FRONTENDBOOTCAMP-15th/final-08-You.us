import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import Main from '@/components/pages/main/Main'
export default function ThemeTestPage() {

  return (
    <div className="mx-auto max-w-[1500px] bg-gray-50">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
