'use client';

import MyPageSection from '@/components/pages/mypage/main/MyPageSection';
import OrderItem from '@/components/pages/mypage/orders/OrderItem';
import { getMyorder } from '@/lib/api/mypage';
import type { Orders } from '@/types/order.types';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [order, setOrder] = useState<Orders['item'][number][]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getMyorder();
      setOrder(data.item);
    };

    fetchOrders();
  }, []);
  console.log('주문:', order);
  return (
    <main className="mt-10 flex w-full flex-col gap-8.5 px-4 pb-8.5 *:text-gray-900 md:px-8 lg:px-12">
      <h1 className="sr-only">주문 내역</h1>

      {/* 전체 주문 내역 리스트 */}
      <section className="flex flex-col gap-2">
        <MyPageSection title={'주문/배송내역'}>
          {/* 주문 내역 카드 컴포넌트 */}
          <ul>
            {order.flatMap((o) =>
              o.products.map((product) => {
                const deliveryStatus =
                  o.state === 'OS040' ? 'DELIVERED' : 'SHIPPING';
                console.log('deliveryStatus', deliveryStatus);
                return (
                  <OrderItem
                    key={product._id}
                    id={product._id}
                    item={{
                      status: deliveryStatus,
                      date: o.createdAt,
                      imageSrc: product.image.path,
                      imageAlt: product.name,
                      name: product.name,
                      price: product.price,
                      deliveryStatus,
                      reviewStatus: product.review ? 'WRITTEN' : 'NONE',
                      scope: product.review
                        ? { rating: product.review.rating }
                        : null,
                    }}
                  />
                );
              }),
            )}
          </ul>
        </MyPageSection>
      </section>
    </main>
  );
}
