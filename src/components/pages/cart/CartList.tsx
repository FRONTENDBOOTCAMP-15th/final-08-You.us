'use client';

import { ModalItem } from '@/app/(with-layout)/cart/page';
import CartListItem from '@/components/pages/cart/CartListItem';
import { CartItemOnList } from '@/types/cart.types';

interface CartListProps {
  items: CartItemOnList[];
  updateItem: (_id: number, item: Partial<CartItemOnList>) => void;
  setItems: (item: CartItemOnList[]) => void;
  setModalItem: (item: ModalItem) => void;
}

export default function CartList({
  items,
  setItems,
  updateItem,
  setModalItem,
}: CartListProps) {
  return (
    <section className="mb-6 flex-1 lg:mb-0" aria-labelledby="cart-items-title">
      <h2 id="cart-items-title" className="sr-only">
        장바구니 상품 목록
      </h2>

      {items.map((item) => (
        <CartListItem
          key={item._id}
          item={item}
          items={items}
          setItems={setItems}
          updateItem={updateItem}
          setModalItem={setModalItem}
        />
      ))}
    </section>
  );
}
