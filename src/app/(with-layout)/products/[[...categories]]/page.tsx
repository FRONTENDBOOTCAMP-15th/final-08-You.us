import ProductCard from '@/components/common/ProductCard';
import ProductSort from '@/components/pages/products/ProductSort';
import { getProducts } from '@/lib/api/products';
import Link from 'next/link';

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ categories?: string[] }>;
}) {
  const { categories } = await params;

  const [category, subCategory] = categories || [];

  console.log(categories);
  const res = await getProducts(category, subCategory);
  const products = res.item;

  return (
    <div className="mx-auto max-w-375">
      {/* 전체 상품 그리드/리스트 뷰 */}
      <main className="w-full bg-gray-50 py-8">
        <div className="px-4">
          <nav aria-label="breadcrumb" className="mb-6 ml-4 lg:mb-8 lg:ml-3">
            <ol className="text-body-sm flex items-center gap-1 text-gray-900">
              <li>
                <Link
                  href="/"
                  className="text-body-md hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                >
                  홈
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="text-gray-900">&gt;</span>
              </li>
              <li>
                <Link
                  href="/category/beauty"
                  className="text-body-md hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                >
                  뷰티
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="text-gray-900">&gt;</span>
              </li>
              <li>
                <span
                  className="text-body-md text-gray-900"
                  aria-current="page"
                >
                  화장품
                </span>
              </li>
            </ol>
          </nav>

          {/* 필터 탭 - 높은가격순, 낮은가격순, 평점많은순, 리뷰많은순 */}
          <div className="mb-6 flex items-center gap-1 pb-4 lg:mb-[45px]">
            <button className="text-body-md cursor-pointer rounded px-3 py-1.5 text-gray-500 hover:text-gray-900">
              높은가격순
            </button>
            <button className="text-body-md cursor-pointer rounded px-3 py-1.5 text-gray-500 hover:text-gray-900">
              낮은가격순
            </button>
            <button className="text-body-md cursor-pointer rounded px-3 py-1.5 text-gray-500 hover:text-gray-900">
              평점많은순
            </button>
            <button className="text-body-md cursor-pointer rounded px-3 py-1.5 text-gray-500 hover:text-gray-900">
              리뷰많은순
            </button>
          </div>

          {/* 카테고리 제목 */}
          <h1 className="text-title-sm font-pretendard mb-8 font-bold text-gray-900">
            화장품 카테고리
          </h1>

          {/* 상품 그리드 */}
          <div
            className="mb-[100px] grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
            role="list"
            aria-label="상품 목록"
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.mainImages[0]!.path}
                name={product.name}
                price={String(product.price)}
                rating={product.rating || 0}
                replies={product.replies}
                mainCategory={product.extra.category[0]!}
                subCategory={product.extra.category[1]!}
              />
            ))}
          </div>
        </div>
      </main>
      <ProductSort products={products} />
    </div>
  );
}
