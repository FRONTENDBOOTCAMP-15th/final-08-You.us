export interface ProductResponse {
  ok: number;
  item: ProductItem[];
}
export interface ProductItem {
  _id: number;
  createdAt: string;
  updatedAt: string;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  name: string;
  quantity: number;
  buyQuantity: number;
  mainImages: ProductImage[];
  extra: ProductExtra;
  options: number;
  replies: number;
  bookmarks: number;
  likes: number;
  rating: number;
}

export interface ProductImage {
  path: string;
  name: string;
}

export interface ProductExtra {
  category: string[];
  sort: number;
  tags: string[];
}

export interface ProductError {
  ok: number;
  message: string;
}
