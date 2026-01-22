interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params

  return (
    <div>
      <h1>상품 상세 - {id}</h1>
      {/* 상품 정보, 리뷰, 구매 버튼 */}
    </div>
  )
}
