// lib/api/products.ts
import { ErrorRes } from '@/types/api.types'
import { ProductResponse } from '@/types/main/ProductType'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || ''

export const getProducts = async (): Promise<ProductResponse | ErrorRes> => {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: 'GET',
      headers: {
        'Client-id': CLIENT_ID,
      },
      cache: 'force-cache',
    })
    if (!res.ok) throw new Error('데이터 불러오는데 실패했습니다.')
    return res.json()
  } catch (error) {
    console.error(error)
    return {
      ok: 0,
      message: '일시적인 네트워크 문제로 게시물 목록 조회에 실패했습니다.',
    }
  }
}
