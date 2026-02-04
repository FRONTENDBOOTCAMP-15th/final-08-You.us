'use client';

import MoreButton from '@/components/common/MoreButton';
import ProductCard from '@/components/common/ProductCard';

interface Product {
  _id: number;
  name: string;
  price: number;
  rating: string;
  mainImage: string;
  replies: number;
}

interface ProductSortProps {
  products: Product[];
}

export default function ProductSort({ products }: ProductSortProps) {
  return (
    <div className="mb-[20px] grid cursor-pointer grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-15">
      <div className="col-span-full mt-[60px]">
        <MoreButton className="mx-auto mb-[150px]" />
      </div>
    </div>
  );
}
