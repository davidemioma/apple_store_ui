export interface Category {
  _id: string;
  slug: {
    _type: "slug";
    current: string;
  };
  title: string;
}

interface Image {
  _key: string;
  _type: "image";
  asset: {
    url: string;
  };
}

export interface ProductProps {
  _id: string;
  category: Category;
  slug: {
    _type: "slug";
    current: string;
  };
  price: number;
  title: string;
  image: Image[];
}

export interface CartItem {
  _id: string;
  category: Category;
  slug: {
    _type: "slug";
    current: string;
  };
  price: number;
  title: string;
  image: Image[];
  quantity: number;
}

export interface stripeProducts {
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  id: string;
  object: string;
  price: {
    unit_amount: number;
  };
  quantity: number;
}
