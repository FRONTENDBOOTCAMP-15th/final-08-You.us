'use client';

import AddressInfo from '@/components/pages/checkout/AddressInfo';
import OrderItems from '@/components/pages/checkout/OrderItems';
import PaymentButton from '@/components/pages/checkout/PaymentButton';
import PaymentMethod from '@/components/pages/checkout/PaymentMethod';
import UserInfo from '@/components/pages/checkout/UserInfo';
import getCartItems, { createOrder, deleteCartItems } from '@/lib/api/checkout';
import useUserStore from '@/lib/zustand/auth/userStore';
import { OrderItem } from '@/types/checkout.types';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function CheckoutPage() {
  const { user } = useUserStore();
  const router = useRouter();

  const searchParams = useSearchParams();
  const cartItemIds = searchParams.get('cartItemIds');
  const ArrayCartItemIds = useMemo(() => {
    return cartItemIds?.split(',').map(Number) || [];
  }, [cartItemIds]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [shippingFees, setShippingFees] = useState(3000);
  const [paymentMethod, setPaymentMethod] = useState('deposit');
  const [sumPrice, setSumPrice] = useState(0);
  const [agreePayment, setAgreePayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    name: '',
    phone: '',
    address: '',
    postalCode: '',
    isDefault: true,
  });

  useEffect(() => {
    if (!user) {
      const currentPath = window.location.pathname;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [user, router]);

  // user 정보 로드되면 addressInfo 초기값 설정
  useEffect(() => {
    if (user) {
      setAddressInfo({
        name: user.name,
        phone: user.phone,
        address: user.address.streetAddress,
        postalCode: user.address.postalCode,
        isDefault: true,
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchCartItems = async () => {
      const items = await getCartItems();
      console.log('아이템즈:', items);
      setShippingFees(items.cost.shippingFees);
      if (items?.item && ArrayCartItemIds) {
        const item = items.item.filter((item) =>
          ArrayCartItemIds.includes(item._id),
        );
        console.log('아이디 배열:', ArrayCartItemIds);
        console.log('필터링된 아이템:', item);
        if (item && item.length > 0) {
          const orders = item.map((item) => ({
            _id: item.product._id,
            image: item.product.image,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            ...(item.size && { size: item.size }),
            ...(item.color && { color: item.color }),
          }));

          setOrderItems(orders);
          console.log('주문 아이템:', orders);
          setSumPrice(
            orders.reduce((sum, item) => sum + item.price * item.quantity, 0),
          );
        }
      }
    };

    fetchCartItems();
  }, [user, ArrayCartItemIds]);

  const handleOrder = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const orderData = {
        products: orderItems.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
          ...(item.size && { size: item.size }),
          ...(item.color && { color: item.color }),
        })),
        address: {
          name: addressInfo.name,
          value: `${addressInfo.postalCode} ${addressInfo.address}`,
        },
        state: 'OS010',
      };

      console.log('주문 데이터:', orderData);

      const result = await createOrder(orderData);

      if (result.ok === 1) {
        // 주문 성공 후 장바구니에서 삭제
        try {
          await deleteCartItems(ArrayCartItemIds);
          console.log('장바구니 삭제 완료');
        } catch (error) {
          console.error('장바구니 삭제 실패:', error);
          // 장바구니 삭제 실패해도 주문은 완료되었으므로 계속 진행
        }

        router.push(`/checkout/result?orderId=${result.item._id}`);
      } else {
        alert('주문에 실패했습니다.');
      }
    } catch (error) {
      console.error('주문 실패:', error);
      alert('주문 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (orderItems.length === 0) {
    return <div>주문 상품을 불러오는 중...</div>;
  }
  return (
    <div className="mx-auto max-w-5xl bg-gray-50 px-6.25 pt-6.25 lg:flex lg:flex-row lg:gap-37.5">
      <h1 className="sr-only">주문・결제 페이지</h1>
      <div className="mb-15 lg:w-200">
        <OrderItems items={orderItems} />
        <form className="mt-7.5">
          {/* 주문자 정보 */}
          <UserInfo user={user} />
          <AddressInfo user={user} onAddressChange={setAddressInfo} />
          <PaymentMethod
            payment={paymentMethod}
            setPayment={setPaymentMethod}
          />
        </form>
      </div>
      <section
        aria-labelledby="final-payment-title"
        className="mt-7.5 mb-7.5 h-fit rounded-[14px] border border-gray-200 bg-white px-6 py-7 lg:w-115"
      >
        <h2
          id="final-payment-title"
          className="text-primary border-primary text-body-sm inline-block border-b-2 pb-1 font-bold"
        >
          최종 결제 금액
        </h2>

        {/* 금액 표 */}
        <dl className="mt-6">
          <div className="flex items-center justify-between border-b border-gray-200 py-1">
            <dt className="text-[12px] font-medium text-gray-900">주문금액</dt>
            <dd className="text-[12px] text-gray-900">
              <data value="218000">{sumPrice}</data>
            </dd>
          </div>

          <div className="flex items-center justify-between py-1">
            <dt className="text-[12px] font-medium text-gray-900">배송비</dt>
            <dd className="text-[12px] text-gray-900">
              <data value="3000">{shippingFees}</data>
            </dd>
          </div>
        </dl>

        {/* 총액 */}
        <div
          aria-live="polite"
          className="mt-5 flex items-baseline justify-end gap-6"
        >
          <strong className="text-body-sm font-bold text-gray-900">
            총 금액
          </strong>
          <strong className="text-primary text-body-sm font-extrabold">
            <data value="220000">{sumPrice + shippingFees}</data>
          </strong>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* 동의 */}
        <div className="flex items-center gap-3">
          <input
            id="agreePayment"
            name="agreePayment"
            type="checkbox"
            required
            checked={agreePayment}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAgreePayment(e.target.checked);
            }}
            className="accent-primary h-3 w-3 shrink-0"
          />
          <label
            htmlFor="agreePayment"
            className="text-[12px] font-medium text-gray-900"
          >
            주문 내용 확인 및 결제 동의{' '}
            <span className="text-gray-900">(필수)</span>
          </label>
        </div>

        <div className="mt-3 space-y-2 pl-6 text-[12px] text-gray-400">
          <Link href="#" className="underline underline-offset-4">
            개인정보 수집 및 이용 동의
          </Link>
        </div>
        <PaymentButton
          paymentMethod={paymentMethod}
          agreePayment={agreePayment}
          onOrder={handleOrder}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
}
