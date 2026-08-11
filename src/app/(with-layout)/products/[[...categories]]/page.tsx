import type { Metadata } from 'next';
import ProductListClient from '@/app/(with-layout)/products/_components/ProductListClient';

type Props = {
  params: Promise<{ categories?: string[] }>;
};

const CATEGORY_NAMES: Record<string, string> = {
  PC01: '식품',
  PC02: '상품권',
  PC03: '뷰티',
  PC04: '주얼리',
  PC05: '패션잡화',
  PC06: '인테리어',
  PC07: '문구',
  PC08: '가전·디지털',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categories } = await params;

  const category = categories?.[0];
  const categoryName = category ? CATEGORY_NAMES[category] || category : '전체';
  const title = `${categoryName} 상품 목록 | You,Us`;
  const description = `You,Us의 ${categoryName} 카테고리 상품을 둘러보세요.`;
  const path = categories?.length
    ? `/products/${categories.join('/')}`
    : '/products';

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'You,Us',
      locale: 'ko_KR',
      type: 'website',
    },
  };
}

export default function ProductsPage({ params }: Props) {
  return <ProductListClient params={params} />;
}
