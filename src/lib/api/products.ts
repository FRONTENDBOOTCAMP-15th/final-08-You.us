// lib/api/products.ts
const BASE_URL = 'https://fesp-api.koyeb.app/market'

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/seller/products`)

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const data = await response.json()
  return data
}
