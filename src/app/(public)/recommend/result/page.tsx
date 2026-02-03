'use client';

import { useEffect, useState, useMemo } from 'react';
import Button from '@/components/common/Button';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import ProductList from '@/components/pages/recommend/ProductList';
import { getRecommendProducts } from '@/lib/api/recommend';
import type {
  Answer,
  RecommendResult as RecommendResultType,
} from '@/types/aitest.types';

type Props = {
  result: RecommendResultType;
  answers: Answer[];
  onReset: () => void;
};

export interface Product {
  _id: string;
  name: string;
  price: number;
  mainImages: { path: string; name: string }[];
  extra?: {
    tags?: string[];
    category?: string[];
  };
}

export default function RecommendResultView({
  result,
  answers,
  onReset,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const a = (i: number) => answers[i]?.value?.trim() ?? '';
  const stripGiftWord = (text: string) =>
    text.replace(/\s*선물\s*/g, '').trim();

  const isAllFilled = [0, 1, 2, 3, 4].every((i) => a(i));

  const searchParams = useMemo(
    () => ({
      recipient: result.tags.recipient,
      ageGroup: result.tags.ageGroup,
      occasion: result.tags.occasion,
      style: result.tags.style,
      minPrice: result.tags.priceRange.min,
      maxPrice: result.tags.priceRange.max,
    }),
    [
      result.tags.recipient,
      result.tags.ageGroup,
      result.tags.occasion,
      result.tags.style,
      result.tags.priceRange.min,
      result.tags.priceRange.max,
    ],
  );

  useEffect(() => {
    if (!isAllFilled) return;

    const tags = [
      searchParams.recipient,
      searchParams.ageGroup,
      searchParams.occasion,
      searchParams.style,
    ].filter(Boolean);

    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const productResult = await getRecommendProducts({
          tags: tags,
          minPrice: searchParams.minPrice,
          maxPrice: searchParams.maxPrice,
          limit: 100,
        });

        if (productResult.ok) {
          setProducts(productResult.items);
        } else {
          alert(productResult.message);
        }
      } catch (error) {
        console.error('상품 조회 오류:', error);
        alert('상품을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [isAllFilled, searchParams]);

  if (!isAllFilled) return null;

  const tags = [
    result.tags.recipient,
    result.tags.ageGroup,
    result.tags.occasion,
    result.tags.style,
  ].filter(Boolean);

  console.log('대답', JSON.stringify(answers, null, 2));
  console.log('반환', JSON.stringify(result, null, 2));
  console.log('태그 배열:', tags);
  console.log('가격대:', result.tags.priceRange);
  console.log('필터링된 상품 수:', products.length);

  return (
    <div className="mx-auto bg-gray-50 lg:max-w-375 lg:min-w-5xl">
      <Header />
      <section className="mx-auto mt-15 mb-30 flex flex-col items-center gap-4 px-2.5 lg:max-w-375 lg:min-w-256.25">
        <h2 className="text-title-md">AI가 추천한 선물은 바로!!</h2>
        <h3 className="text-title-sm text-gary-900 w-fit border-gray-900 text-center">
          ({stripGiftWord(a(1))}) ({stripGiftWord(a(0))})에게 선물하기 좋은{' '}
          <br className="block lg:hidden" />({stripGiftWord(a(4))}) (
          {stripGiftWord(a(3))}) ({stripGiftWord(a(2))}) 선물
        </h3>
        <Button type="button" className="mb-15 leading-4" onClick={onReset}>
          다시 하기
        </Button>

        {isLoading ? (
          <div className="py-20 text-center">
            <p className="text-lg">상품을 불러오는 중...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg">조건에 맞는 상품이 없습니다.</p>
            <p className="mt-2 text-sm text-gray-500">
              다른 조건으로 다시 시도해주세요.
            </p>
          </div>
        ) : (
          <>
            <ProductList products={products} />
          </>
        )}
      </section>
      <Footer />
    </div>
  );
}
