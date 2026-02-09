'use client';

import { useState, useEffect } from 'react';
import CartList from '@/components/pages/cart/CartList';
import CartEmpty from '@/components/pages/cart/CartEmpty';
import { getCartItems, deleteCartItem, updateCartItem } from '@/lib/api/cart';

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

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 장바구니 데이터 불러오기
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setIsLoading(true);
        const response = await getCartItems();

        // API 응답을 CartItem 형식으로 변환
        const cartItems: CartItem[] = response.item.map((item) => ({
          _id: item._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          checked: false,
          option:
            item.size && item.color
              ? `사이즈: ${item.size}, 색상: ${item.color}`
              : item.size
                ? `사이즈: ${item.size}`
                : item.color
                  ? `색상: ${item.color}`
                  : '옵션 없음',
          image: item.product.mainImages?.[0]?.path || '',
          storeName: item.product.seller?.name || '판매자 정보 없음',
        }));

        setItems(cartItems);
      } catch (error) {
        console.error('장바구니 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const allChecked = items.length > 0 && items.every((item) => item.checked);
  const checkedCount = items.filter((item) => item.checked).length;
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const updateItem = (_id: number, updates: Partial<CartItem>) => {
    setItems(
      items.map((item) => (item._id === _id ? { ...item, ...updates } : item)),
    );
  };

  const handleAllCheck = (checked: boolean) => {
    setItems(items.map((item) => ({ ...item, checked })));
  };

  const handleItemCheck = (_id: number) => {
    updateItem(_id, {
      checked: !items.find((item) => item._id === _id)?.checked,
    });
  };

  const handleQuantityChange = async (_id: number, delta: number) => {
    const item = items.find((item) => item._id === _id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    try {
      await updateCartItem(_id, { quantity: newQuantity });
      updateItem(_id, { quantity: newQuantity });
    } catch (error) {
      console.error('수량 변경 실패:', error);
    }
  };

  const handleDelete = async (_id: number) => {
    try {
      await deleteCartItem(_id);
      setItems(items.filter((item) => item._id !== _id));
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const selectedIds = items
        .filter((item) => item.checked)
        .map((item) => item._id);
      await Promise.all(selectedIds.map((id) => deleteCartItem(id)));
      setItems(items.filter((item) => !item.checked));
    } catch (error) {
      console.error('선택 삭제 실패:', error);
    }
  };

  const handleOptionChange = (
    _id: number,
    option: string,
    quantity: number,
  ) => {
    updateItem(_id, { option, quantity });
  };

  const handleOptionAdd = (_id: number, option: string, quantity: number) => {
    const baseItem = items.find((item) => item._id === _id);
    if (!baseItem) return;

    const newId = Math.max(...items.map((item) => item._id)) + 1;

    const newItem: CartItem = {
      ...baseItem,
      _id: newId,
      option: `향: ${option}`,
      quantity: quantity,
      checked: false,
    };

    setItems([...items, newItem]);
  };

  if (isLoading) {
    return <div className="py-20 text-center">로딩 중...</div>;
  }

  if (items.length === 0) return <CartEmpty />;

  return (
    <CartList
      items={items}
      allChecked={allChecked}
      checkedCount={checkedCount}
      totalPrice={totalPrice}
      totalQuantity={totalQuantity}
      onAllCheck={handleAllCheck}
      onItemCheck={handleItemCheck}
      onQuantityChange={handleQuantityChange}
      onDelete={handleDelete}
      onDeleteSelected={handleDeleteSelected}
      onOptionChange={handleOptionChange}
      onOptionAdd={handleOptionAdd}
    />
  );
}
