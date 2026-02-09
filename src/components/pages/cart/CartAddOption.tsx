'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';

interface CartItem {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  checked: boolean;
  option: string;
  image: string;
  storeName: string;
}

interface CartAddOptionProps {
  item: CartItem;
  onClose: () => void;
  onAdd: (option: string, quantity: number) => void;
}

export default function CartAddOption({
  item,
  onClose,
  onAdd,
}: CartAddOptionProps) {
  const [selectedOption, setSelectedOption] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAdd(selectedOption, quantity);
    onClose();
  };

  return (
    <>
      <div
        className="bg-opacity-50 fixed inset-0 z-40 bg-gray-900 opacity-80"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded bg-gray-100 p-4 shadow-xl">
        {/* 상품 이미지 */}
        <div className="mb-4 flex justify-center">
          <Image
            src={item.image}
            alt={item.name}
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* 상품명 */}
        <p className="text-body-sm mb-2 text-gray-900">{item.name}</p>

        {/* 가격 */}
        <p className="text-body-sm mb-4 font-bold">
          {item.price.toLocaleString()}원
        </p>

        {/* 옵션 추가 */}
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="text-body-sm mb-4 w-full cursor-pointer rounded-sm border border-gray-300 bg-gray-50 p-2 text-center"
        >
          <option value="라벤더 향">라벤더 향</option>
          <option value="로즈마리 향">로즈마리 향</option>
          <option value="유칼립투스 향">유칼립투스 향</option>
          <option value="바닐라 향">바닐라 향</option>
        </select>

        {/* 수량 조절 */}
        <div className="mb-6 flex items-center justify-end gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-8 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-gray-50"
          >
            -
          </button>
          <span className="w-5 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-8 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-gray-50"
          >
            +
          </button>
        </div>

        {/* 취소/추가 버튼 */}
        <div className="flex gap-5">
          <Button
            onClick={onClose}
            className="flex-1 border border-gray-300 bg-gray-50 py-3 text-gray-900 hover:bg-gray-50 hover:text-gray-900"
          >
            취소
          </Button>
          <Button onClick={handleAdd} className="flex-1 py-3 text-gray-50">
            추가
          </Button>
        </div>
      </div>
    </>
  );
}
