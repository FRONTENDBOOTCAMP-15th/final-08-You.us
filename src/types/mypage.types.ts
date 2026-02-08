import { StaticImport } from 'next/dist/shared/lib/get-img-props';

// 회원 정보 타입
export interface MyUser {
  ok: number;
  item: {
    _id: number;
    email: string;
    name: string;
    image?: string | undefined | StaticImport;
    token?: {
      accessToken: string;
      refreshToken: string;
    };
    address: { streetAddress?: string; postalCode?: string };
    phone: string;
  };
}

//회원정보 수정타입
export interface UserReset {
  email?: string;
  name?: string;
  image?: string | undefined | StaticImport;
  address?: { streetAddress?: string; postalCode?: string };
  phone?: string;
}

// 상품 요약 타입
type ProductSummaryProps = {
  imageSrc: string;
  imageAlt: string;
  name: string;
  price: number | string;
};

// 주문 목록 타입
type OrderItemCardProps = {
  deliveryStatus: 'SHIPPING' | 'DELIVERED';
  reviewStatus: 'NONE' | 'WRITTEN';
  product: {
    image: string;
    name: string;
    price: string;
  };
  date: string;
};

// 리뷰 별점 타입
type ReviewInfoProps = {
  deliveryStatus: 'SHIPPING' | 'DELIVERED';
  reviewStatus: 'NONE' | 'WRITTEN';
  scope: Scope | null;
};

// 별점 갯수 타입
type Scope = {
  rating: number; // 1~5
};
