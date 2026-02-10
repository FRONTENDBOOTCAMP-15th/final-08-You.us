import Button from '@/components/common/Button';
import EmptyState from '@/components/common/EmptyState';
import OrderStatusHeader from '@/components/pages/mypage/orders/OrderStatusHeader';
import { getMyorder } from '@/lib/api/mypage';
import { OrderList } from '@/types/order.types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderList() {
  const [order, setOrder] = useState<OrderList>('');
  useEffect(() => {
    // 주문 목록 불러오기
    const fetchOrders = async () => {
      const data = await getMyorder();
      const dataItem = data[0];
      setOrder(dataItem);
      console.log('주문데이터:', data);
      // console.log('주문데이터2:', data.item);
      console.log('주문데이터3:', data[0]);
    };

    fetchOrders();
  }, []);
  console.log('1. 주문목록:', order);
  console.log('2. 주문목록 상태:', order.state);
  console.log('3. 주문목록 만든시간:', order.createdAt);

  if (order?.item.length() === 0) {
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
  // console.log('주문내역:', order);

  return (
    <ul>
      {order?.item?.map((orderItem) => (
        <li key={orderItem.id} className="mb-2">
          <OrderStatusHeader
            status={orderItem.item.state === 'OS040' ? 'DELIVERED' : 'SHIPPING'}
            date={orderItem.item.createdAt}
          />
          <div className="border-primary ml-3 flex flex-col border-b bg-white lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 bg-white">
              <Image
                src={orderItem.item.products[0]?.image ?? ''}
                alt={orderItem.item.products[0]?.name ?? ''}
                width={100}
                height={100}
                className="border-primary m-5 h-25 w-25 shrink-0 rounded-lg border-2 object-cover"
              />
              <div className="leading-8 *:line-clamp-1">
                <p className="text-body-md line-clamp-1">
                  {orderItem.item.products[0]?.name}
                </p>
                <p className="text-body-md">{orderItem.item.cost.total}원</p>
                {orderItem.item.products.length > 1 && (
                  <p>외 {orderItem.item.products.length - 1}건</p>
                )}
              </div>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2 p-4 sm:w-auto sm:p-2">
              <Link href={`/mypage/orders/${orderItem.item._id}`}>
                <Button
                  aria-label="주문 상세 보기"
                  className="text-body-sm py-button-y w-full shrink-0"
                >
                  주문상세
                </Button>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
