'use client';

import { useState, useEffect } from 'react';
import CartList from '@/components/pages/cart/CartList';
import CartEmpty from '@/components/pages/cart/CartEmpty';
import { getCartItems } from '@/lib/api/cart';
import { CartItemOnList } from '@/types/cart.types';

import Button from '@/components/common/Button';
import CartOptionModal from '@/components/pages/cart/CartOptionModal';
import Allcheck from '@/components/pages/cart/AllCheck';
import { useRouter } from 'next/navigation';

export interface ModalItem extends CartItemOnList {
  type: 'edit' | 'add'; // 모달 타입 추가
}

export default function CartPage() {
  const [items, setItems] = useState<CartItemOnList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  // 옵션 변경 모달 상태
  const [modalItem, setModalItem] = useState<ModalItem | null>(null);

  // 장바구니 데이터 불러오기
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setIsLoading(true);
        const response = await getCartItems(); // API 호출
        console.log('장바구니 데이터', response);

        // API 응답을 CartItem 형식으로 변환
        const cartItems: CartItemOnList[] = response.item.map((item) => ({
          _id: item._id,
          product_id: item.product_id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          checked: false, // 초기값: 체크 안 됨
          option: item.color,
          options: item.product.extra.options,
          image: item.product.image?.path || '',
          storeName: item.product.seller?.name || '',
        }));

        setItems(cartItems);
      } catch (error) {
        console.error('장바구니 불러오기 실패:', error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchCartItems(); // 컴포넌트 마운트 시 1회 실행
  }, []);

  const handleOrder = () => {
    // 1. 체크된 상품들의 ID만 추출
    const idList = items
      .filter((item) => item.checked)
      .map((item) => item._id)
      .join(',');
    // 2. 쿼리스트링으로 결제 페이지 이동
    const url = `/checkout?id=${idList}`;
    router.push(url);
  };
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const updateItem = (_id: number, updates: Partial<CartItemOnList>) => {
    setItems(
      items.map((item) => (item._id === _id ? { ...item, ...updates } : item)),
    );
  };

  if (isLoading) {
    return <div className="py-20 text-center">로딩 중...</div>;
  }

  if (items.length === 0) return <CartEmpty />;

  return (
    <>
      <main className="pb-20 lg:pb-50">
        {/* 장바구니 제목 */}
        <h1 className="text-title-sm color-gray-900 font-pretendard mt-[55px] mb-[50px] ml-[25px] lg:mt-[50px] lg:mb-[57px]">
          장바구니
        </h1>

        {/* 전체선택 */}
        <Allcheck items={items} setItems={setItems} />
        {/* 장바구니 내용 */}
        <section className="w-full bg-gray-100 pt-[45px] pb-[60px] lg:pb-[80px]">
          <div className="mx-auto max-w-[1500px] px-4 py-4 lg:flex lg:gap-11">
            <CartList
              items={items}
              setItems={setItems}
              updateItem={updateItem}
              setModalItem={setModalItem}
            />

            {/* 주문 예상 금액 */}
            <aside
              className="w-full shrink-0 lg:w-105"
              aria-labelledby="order-summary-title"
            >
              <div className="rounded border border-gray-300 bg-white p-6 lg:px-8 lg:pt-12">
                <h2
                  id="order-summary-title"
                  className="text-body-lg mb-4 border-b border-gray-900 pb-4 font-bold"
                >
                  주문 예상 금액
                </h2>

                {/* 상품 금액 */}
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-body-sm text-gray-900">총 상품금액</dt>
                    <dd className="text-body-sm font-bold text-gray-900">
                      {totalPrice.toLocaleString()}원
                    </dd>
                  </div>
                  <div className="mb-8 flex justify-between">
                    <dt className="text-body-sm text-gray-900">배송비</dt>
                    <dd>0원</dd>
                  </div>
                </dl>

                {/* 총 주문 금액 */}
                <dl className="mb-12">
                  <div className="flex items-center justify-between rounded-2xl">
                    <dt className="text-body-md">
                      총 {totalQuantity}건 주문 금액
                    </dt>
                    <dd className="text-body-lg font-bold text-gray-900">
                      {totalPrice.toLocaleString()}원
                    </dd>
                  </div>
                </dl>

                {/* 주문하기 버튼 */}
                <Button
                  onClick={handleOrder}
                  variant="primary"
                  className="w-full px-16 py-2 tracking-tighter lg:py-4"
                >
                  주문하기
                </Button>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* 옵션 변경 모달 */}
      {modalItem && (
        <CartOptionModal
          modalItem={modalItem}
          setModalItem={setModalItem}
          setItems={setItems}
        />
      )}
    </>
  );
}
