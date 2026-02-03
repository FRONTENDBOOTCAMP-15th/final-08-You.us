'use client'

import MoreButton from '@/components/common/MoreButton'
import ProductCard from '@/components/common/ProductCard'
import product from '@/types/product.type'

interface Product {
  _id?: number
  id?: number
  name: string
  price: number | string
  rating?: string
  image: string
}

interface ProductSortProps {
  products: Product[]
}

export default function ProductSort({ products }: ProductSortProps) {
  return (
    <div className="mb-[20px] grid cursor-pointer grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-15">
      <div className="col-span-full mt-[60px]">
        <MoreButton className="mx-auto mb-[150px]" />
      </div>
    </div>
  )
}
