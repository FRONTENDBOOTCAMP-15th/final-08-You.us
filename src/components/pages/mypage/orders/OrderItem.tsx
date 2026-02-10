import ProductSummary from '@/components/pages/mypage/main/ProductSummary';
import OrderStatusHeader from '@/components/pages/mypage/orders/OrderStatusHeader';
import Button from '@/components/common/Button';
import EmptyState from '@/components/common/EmptyState';
import Link from 'next/link';
// import { order } from '@/components/pages/mypage/orders/OrderList';

export default function OrderItem({
  id,
  item: {
    status,
    date,
    imageSrc,
    imageAlt,
    name,
    price,
    deliveryStatus,
    reviewStatus,
    scope,
  },
}: {
  id: number;
  item: {
    status: 'SHIPPING' | 'DELIVERED';
    date: string;
    imageSrc: string;
    imageAlt: string;
    name: string;
    price: number | string;
    deliveryStatus: 'SHIPPING' | 'DELIVERED';
    reviewStatus: 'NONE' | 'WRITTEN';
    scope: { rating: number } | null;
  };
}) {
  if (order.length === 0) {
    return (
      <EmptyState
        message="주문한 상품이 없습니다."
        action={
          <Link href="/products">
            <Button className="text-body-sm">상품 보러가기</Button>
          </Link>
        }
      />
    );
  }
  return (
    <li className="mb-2">
      <OrderStatusHeader status={status} date={date} />
      <div className="border-primary ml-3 flex flex-col border-b bg-white lg:flex-row lg:items-center lg:justify-between">
        <ProductSummary
          key={id}
          imageAlt={imageAlt}
          imageSrc={imageSrc}
          name={name}
          price={price}
          scope={scope}
          deliveryStatus={deliveryStatus}
          reviewStatus={reviewStatus}
        />
      </div>
    </li>
  );
}
