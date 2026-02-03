// lib/api/recommend.ts
const API_SERVER = process.env.NEXT_PUBLIC_API_URL
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || ''

interface GetRecommendProductsParams {
  tags: string[]
  minPrice?: number
  maxPrice?: number
  limit?: number
}

/**
 * 추천 상품 목록 조회 (로그인 불필요)
 */
export async function getRecommendProducts({
  tags,
  minPrice,
  maxPrice,
  limit = 100,
}: GetRecommendProductsParams) {
  try {
    const params: Record<string, string> = {
      limit: String(limit),
    }

    // 가격 필터
    if (minPrice !== undefined) {
      params.minPrice = String(minPrice)
    }
    if (maxPrice !== undefined) {
      params.maxPrice = String(maxPrice)
    }

    const searchParams = new URLSearchParams(params)
    const url = `${API_SERVER}/products?${searchParams.toString()}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Client-Id': CLIENT_ID,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('API 응답 에러:', errorData)
      return {
        ok: 0,
        message: errorData.message || '상품을 불러오는데 실패했습니다.',
        items: [],
      }
    }

    const data = await response.json()

    // 4개 태그 모두 포함된 상품만 필터링
    const filteredProducts = (data.item || []).filter((product: any) => {
      const productTags = product.extra?.tags || []
      return tags.every((tag) => productTags.includes(tag))
    })

    return {
      ok: 1,
      items: filteredProducts,
      total: filteredProducts.length,
    }
  } catch (error) {
    console.error('상품 조회 오류:', error)
    return {
      ok: 0,
      message: '상품을 불러오는데 실패했습니다.',
      items: [],
    }
  }
}
