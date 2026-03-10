export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface CartItem extends Product {
  quantity: number;
}
