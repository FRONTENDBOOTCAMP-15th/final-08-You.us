// src/lib/api/cart.ts

import fetchClient from '@/lib/api/fetchClient';

/**
 * 상품 이미지 타입
 */
export interface ProductImage {
  path: string;
  name: string;
}

/**
 * 장바구니 아이템 타입 (장바구니 조회 시 상품 정보 포함)
 */
export interface CartItem {
  _id: number;
  quantity: number;
  size?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
  product: string;
  // 상품 정보 (장바구니 조회 시 함께 반환됨)
  seller_id: number;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  name: string;
  buyQuantity: number;
  mainImages: ProductImage[];
}

/**
 * 장바구니 추가 요청 타입
 */
export interface AddToCartRequest {
  product_id: number;
  quantity: number;
  size?: string;
  color?: string;
  addedAt: string;
}

/**
 * 장바구니 응답 타입 (단일 아이템)
 */
export interface CartResponse {
  ok: number;
  item: CartItem;
}

/**
 * 장바구니 목록 응답 타입
 */
export interface CartListResponse {
  ok: number;
  item: CartItem[];
}

/**
 * 상품 옵션 정보 타입
 */
export interface ProductOption {
  _id: string;
  name: string;
  values: string[];
}

/**
 * 상품 상세 정보 타입
 */
export interface ProductDetail {
  _id: number;
  name: string;
  price: number;
  mainImages: ProductImage[];
  extra?: {
    options?: ProductOption[];
  };
}

/**
 * 로컬 장바구니 아이템 타입
 */
export interface LocalCartItem {
  product_id: number;
  quantity: number;
  size?: string;
  color?: string;
  addedAt: string;
  // 표시용 추가 정보
  name?: string;
  price?: number;
  image?: string;
  seller_id?: number;
}

const CART_STORAGE_KEY = 'guest_cart';

/**
 * 로컬 스토리지에서 장바구니 데이터 가져오기
 */
export function getLocalCart(): LocalCartItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('로컬 장바구니 데이터 로드 실패:', error);
    return [];
  }
}

/**
 * 로컬 스토리지에 장바구니 데이터 저장하기
 */
function saveLocalCart(cart: LocalCartItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('로컬 장바구니 데이터 저장 실패:', error);
  }
}

/**
 * 비로그인 장바구니에 상품 추가
 */
export function addToLocalCart(item: LocalCartItem): void {
  const cart = getLocalCart();

  // 동일한 상품(id, size, color 모두 일치)이 있는지 확인
  const existingItemIndex = cart.findIndex(
    (cartItem) =>
      cartItem.product_id === item.product_id &&
      cartItem.size === item.size &&
      cartItem.color === item.color,
  );

  if (existingItemIndex > -1) {
    // 이미 있으면 수량만 증가
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    // 없으면 새로 추가
    cart.push(item);
  }

  saveLocalCart(cart);
}

/**
 * 로컬 장바구니에서 상품 제거
 */
export function removeFromLocalCart(
  productId: number,
  size?: string,
  color?: string,
): void {
  let cart = getLocalCart();

  cart = cart.filter(
    (item) =>
      !(
        item.product_id === productId &&
        item.size === size &&
        item.color === color
      ),
  );

  saveLocalCart(cart);
}

/**
 * 로컬 장바구니 수량 업데이트
 */
export function updateLocalCartQuantity(
  productId: number,
  quantity: number,
  size?: string,
  color?: string,
): void {
  const cart = getLocalCart();

  const itemIndex = cart.findIndex(
    (item) =>
      item.product_id === productId &&
      item.size === size &&
      item.color === color,
  );

  if (itemIndex > -1) {
    if (quantity <= 0) {
      // 수량이 0 이하면 상품 제거
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    saveLocalCart(cart);
  }
}

/**
 * 로컬 장바구니 전체 비우기
 */
export function clearLocalCart(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_STORAGE_KEY);
}

/**
 * 로컬 장바구니 상품 개수 (총 수량)
 */
export function getLocalCartCount(): number {
  const cart = getLocalCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * 로컬 장바구니 아이템 개수 (중복 제외)
 */
export function getLocalCartItemCount(): number {
  const cart = getLocalCart();
  return cart.length;
}

/**
 * 특정 상품이 장바구니에 있는지 확인
 */
export function isInLocalCart(
  productId: number,
  size?: string,
  color?: string,
): boolean {
  const cart = getLocalCart();
  return cart.some(
    (item) =>
      item.product_id === productId &&
      item.size === size &&
      item.color === color,
  );
}

/**
 * 로그인 후 로컬 장바구니를 서버로 동기화
 */
export async function syncLocalCartToServer(): Promise<{
  success: boolean;
  syncedCount: number;
  errors: string[];
}> {
  const localCart = getLocalCart();

  if (localCart.length === 0) {
    return {
      success: true,
      syncedCount: 0,
      errors: [],
    };
  }

  const errors: string[] = [];
  let syncedCount = 0;

  // 로컬 장바구니의 각 항목을 서버로 전송
  for (const item of localCart) {
    try {
      await addToCart({
        product_id: item.product_id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        addedAt: item.addedAt,
      });
      syncedCount++;
    } catch (error) {
      console.error('장바구니 동기화 실패:', item, error);
      errors.push(`상품 ${item.product_id} 동기화 실패`);
    }
  }

  // 로컬 장바구니 비우기
  if (errors.length === 0) {
    clearLocalCart();
  }

  return {
    success: errors.length === 0,
    syncedCount,
    errors,
  };
}

/**
 * 장바구니에 상품 추가
 */
export async function addToCart(
  cartData: AddToCartRequest,
): Promise<CartResponse> {
  const url = '/carts';
  return fetchClient<CartResponse>(url, {
    method: 'POST',
    body: JSON.stringify(cartData),
  });
}

/**
 * 장바구니 목록 조회
 */
export async function getCartItems(): Promise<CartListResponse> {
  const url = '/carts';
  return fetchClient<CartListResponse>(url);
}

/**
 * 장바구니 아이템 수량 수정
 */
export async function updateCartItem(
  cartId: number,
  updates: { quantity: number },
): Promise<CartResponse> {
  const url = `/carts/${cartId}`;
  return fetchClient<CartResponse>(url, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

/**
 * 장바구니 아이템 삭제
 */
export async function deleteCartItem(cartId: number): Promise<{ ok: number }> {
  const url = `/carts/${cartId}`;
  return fetchClient<{ ok: number }>(url, {
    method: 'DELETE',
  });
}

/**
 * 상품 상세 조회 (옵션 정보 가져오기용)
 */
export async function getProductDetail(
  productId: number,
): Promise<{ ok: number; item: ProductDetail }> {
  const url = `/products/${productId}`;
  return fetchClient<{ ok: number; item: ProductDetail }>(url);
}
