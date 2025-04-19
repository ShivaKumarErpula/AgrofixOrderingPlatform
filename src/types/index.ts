
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  unit: string; // kg, piece, bunch, etc.
}

export interface OrderItem {
  productId: string;
  quantity: number;
  productName: string;
  productPrice: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customer: CustomerInfo;
  status: 'pending' | 'in-progress' | 'delivered';
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
}
