import MainBannerSwiper from '@/components/pages/main/MainBannerSwiper'
import ProductCategorySection from '@/components/pages/main/ProductCategorySection'
import getMainCategorySeller from '@/lib/api/main/getProductsList'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const CATEGORIES = [
  { code: 'PC01', title: '식품' },
  { code: 'PC03', title: '뷰티' },
  { code: 'PC04', title: '쥬얼리' },
] as const

export default async function MainPage() {
  const cookieStore = await cookies()
  const hasVisited = cookieStore.get('hasVisited')

  if (!hasVisited) {
    redirect('/intro')
  }

  const responses = await Promise.all(
    CATEGORIES.map(async (cat) => {
      const res = await getMainCategorySeller(cat.code)
      return {
        title: cat.title,
        items: 'item' in res ? res.item : [],
      }
    }),
  )

  return (
    <main>
      <MainBannerSwiper />

      <div className="mx-auto px-4 py-8 lg:mb-15">
        {responses.map((category) => (
          <ProductCategorySection
            key={category.title}
            categoryName={category.title}
            products={category.items}
          />
        ))}
      </div>
    </main>
  )
}
