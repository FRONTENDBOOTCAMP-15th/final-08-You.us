'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  option: string;
  image: string;
}

interface CartItemWithModalProps {
  item: CartItem;
  onUpdate: (id: string, option: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemWithModal({
  item,
  onUpdate,
  onRemove,
}: CartItemWithModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(item.option);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleOpenModal = () => {
    setSelectedOption(item.option);
    setQuantity(item.quantity);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    onUpdate(item.id, selectedOption, quantity);
    setIsModalOpen(false);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  return (
    <>
      {/* 장바구니 아이템 */}
      <div className="flex gap-4 border-b border-gray-200 py-4">
        <input type="checkbox" className="h-5 w-5" />

        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="object-cover"
        />

        <div className="flex-1">
          <p className="text-body-sm mb-2">{item.name}</p>
          <p className="text-caption mb-2 text-gray-600">향: {item.option}</p>

          <button
            onClick={handleOpenModal}
            className="text-caption rounded border border-gray-300 px-3 py-1 hover:bg-gray-50"
          >
            옵션변경
          </button>

          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() =>
                onUpdate(item.id, item.option, Math.max(1, item.quantity - 1))
              }
              className="flex h-6 w-6 items-center justify-center rounded border border-gray-300"
            >
              -
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdate(item.id, item.option, item.quantity + 1)}
              className="flex h-6 w-6 items-center justify-center rounded border border-gray-300"
            >
              +
            </button>
          </div>

          <p className="text-body-sm mt-2 font-bold">
            {(item.price * item.quantity).toLocaleString()}원
          </p>
        </div>

        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <>
          <div
            className="bg-opacity-50 fixed inset-0 z-40 bg-gray-900 opacity-80"
            onClick={handleCloseModal}
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

            {/* 옵션 선택 */}
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
                onClick={() => handleQuantityChange(quantity - 1)}
                className="flex h-8 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-gray-50"
              >
                -
              </button>
              <span className="w-5 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="flex h-8 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-gray-50"
              >
                +
              </button>
            </div>

            {/* 취소/수정 버튼 */}
            <div className="flex gap-5">
              <Button
                onClick={handleCloseModal}
                className="flex-1 border border-gray-300 bg-gray-50 py-3 text-gray-900 hover:bg-gray-50 hover:text-gray-900"
              >
                취소
              </Button>
              <Button onClick={handleSave} className="flex-1 py-3 text-gray-50">
                수정
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
