'use client'

import { useState } from 'react'
import CartList from '@/components/pages/cart/CartList'
import CartEmpty from '@/components/pages/cart/CartEmpty'

interface CartItem {
  _id: number
  name: string
  price: number
  quantity: number
  checked: boolean
  option: string
  image: string
  storeName: string
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([
    {
      _id: 1,
      name: '선물 이름) 향기 좋은 향초 - 라벤더',
      price: 10900,
      quantity: 1,
      checked: false,
      option: '향: 라벤더 향',
      image: '/images/cart/candle.png',
      storeName: '향기좋은 향초나라',
    },
  ])

  const allChecked = items.length > 0 && items.every((item) => item.checked)
  const checkedCount = items.filter((item) => item.checked).length
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  const updateItem = (_id: number, updates: Partial<CartItem>) => {
    setItems(
      items.map((item) => (item._id === _id ? { ...item, ...updates } : item)),
    )
  }

  const handleAllCheck = (checked: boolean) => {
    setItems(items.map((item) => ({ ...item, checked })))
  }

  const handleItemCheck = (_id: number) => {
    updateItem(_id, {
      checked: !items.find((item) => item._id === _id)?.checked,
    })
  }

  const handleQuantityChange = (_id: number, delta: number) => {
    const item = items.find((item) => item._id === _id)
    if (item) updateItem(_id, { quantity: Math.max(1, item.quantity + delta) })
  }

  const handleDelete = (_id: number) =>
    setItems(items.filter((item) => item._id !== _id))

  const handleDeleteSelected = () =>
    setItems(items.filter((item) => !item.checked))

  if (items.length === 0) return <CartEmpty />

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
    />
  )
}
