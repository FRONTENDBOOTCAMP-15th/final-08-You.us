interface OrderDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params

  return (
    <div>
      <h1>주문 상세 - {id}</h1>
      {/* 주문 상품, 배송 정보, 결제 정보 */}
    </div>
  )
}
