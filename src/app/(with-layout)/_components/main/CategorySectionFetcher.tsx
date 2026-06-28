import getMainCategorySeller from '@/lib/api/main/getProductsList';
import ProductCategorySection from './ProductCategorySection';

interface CategorySectionFetcherProps {
  code: 'PC01' | 'PC03' | 'PC04';
  title: string;
}

export default async function CategorySectionFetcher({
  code,
  title,
}: CategorySectionFetcherProps) {
  const res = await getMainCategorySeller(code);

  if (!('item' in res) || res.item.length === 0) {
    return (
      <div className="mb-12 lg:mb-16">
        <p className="py-10 text-center text-sm text-gray-400">
          {title} 카테고리에 서버 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      </div>
    );
  }

  return <ProductCategorySection categoryName={title} products={res.item} />;
}
