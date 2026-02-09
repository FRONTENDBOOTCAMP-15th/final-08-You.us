'use client';

import Button from '@/components/common/Button';
import { PaymentButtonProps } from '@/types/checkout.types';

export default function PaymentButton({
  paymentMethod,
  agreePayment,
  onOrder,
  isLoading,
}: PaymentButtonProps) {
  const handleClick = async () => {
    await onOrder();
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={!agreePayment || isLoading}
      className="bg-primary hover:bg-primary-hover mt-6 w-full rounded-full py-4 text-lg font-bold text-white"
    >
      {isLoading ? '주문 처리중...' : '주문하기'}
    </Button>
  );
}
