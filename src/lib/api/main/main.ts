import type { ProductResponse, ProductError } from '@/types/main/ProductType'

// 카테고리별 상품 조회 (제일 많이 팔린순서 별로)
export default async function getCategorySeller(
  category: '식품' | '뷰티' | '쥬얼리',
): Promise<ProductResponse | ProductError> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID as string

  try {
    const response = await fetch(`${API_URL}/product`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
      next: {
        //   tags: ['posts'],
        revalidate: 1800, // 5분마다 자동 갱신
      },
    })

    const data = await response.json()

    return data
  } catch (err) {
    return {
      ok: 0,
      message: err instanceof Error ? err.message : String(err),
    }
  }
}
