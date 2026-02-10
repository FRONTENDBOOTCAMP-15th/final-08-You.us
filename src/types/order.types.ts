export interface Orders {
  ok: number;
  item: [
    {
      _id: number;
      user_id: number;
      state: 'OS030' | 'OS035' | 'OS040';
      products: OrderItem[];
      cost: {
        products: number;
        shippingFees: number;
        discount: {
          products: number;
          shippingFees: number;
        };
        total: number;
      };
      address: {
        name: string;
        value: string;
      };
      createdAt: string;
      updatedAt: string;
    },
  ];
}

export interface OrderItem {
  _id: number;
  seller_id: number;
  seller: {
    _id: number;
    name: string;
    image: string;
  };
  state: 'OS030' | 'OS035' | 'OS040';
  name: string;
  image: string;
  quantity: number;
  price: string;
  review_id: number;
  review: {
    rating: number;
    content: string;
    extra?: {
      title: string;
    };
    createdAt: string;
  };
}
