
import { Product, Order } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Apples',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?q=80&w=500',
    description: 'Fresh organic apples, perfect for eating or baking.',
    unit: 'kg'
  },
  {
    id: '2',
    name: 'Bananas',
    price: 1.49,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=500',
    description: 'Ripe and sweet bananas, ready to eat.',
    unit: 'kg'
  },
  {
    id: '3',
    name: 'Carrots',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=500',
    description: 'Fresh, crunchy carrots, perfect for salads or cooking.',
    unit: 'kg'
  },
  {
    id: '4',
    name: 'Potatoes',
    price: 0.99,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=500',
    description: 'Versatile potatoes, great for roasting, mashing, or frying.',
    unit: 'kg'
  },
  {
    id: '5',
    name: 'Tomatoes',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=500',
    description: 'Juicy, ripe tomatoes, perfect for salads or sauces.',
    unit: 'kg'
  },
  {
    id: '6',
    name: 'Spinach',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=500',
    description: 'Fresh, leafy spinach, packed with nutrients.',
    unit: 'bunch'
  },
  {
    id: '7',
    name: 'Oranges',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=500',
    description: 'Sweet and juicy oranges, great for juicing or eating.',
    unit: 'kg'
  },
  {
    id: '8',
    name: 'Bell Peppers',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=500',
    description: 'Colorful bell peppers, great for adding flavor to any dish.',
    unit: 'kg'
  },
  {
    id: '9',
    name: 'Cucumbers',
    price: 1.79,
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?q=80&w=500',
    description: 'Cool and crisp cucumbers, perfect for salads.',
    unit: 'kg'
  },
  {
    id: '10',
    name: 'Strawberries',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=500',
    description: 'Sweet and juicy strawberries, great for desserts or snacking.',
    unit: 'kg'
  }
];

// Sample orders - in a real app this would come from a database
export const orders: Order[] = [
  {
    id: 'ORD-1001',
    items: [
      { productId: '1', quantity: 5, productName: 'Organic Apples', productPrice: 2.99 },
      { productId: '3', quantity: 3, productName: 'Carrots', productPrice: 1.99 }
    ],
    customer: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '555-123-4567',
      address: '123 Main St, Anytown, AT 12345'
    },
    status: 'delivered',
    total: 20.92,
    createdAt: '2023-11-10T15:30:00Z',
    updatedAt: '2023-11-12T09:15:00Z'
  },
  {
    id: 'ORD-1002',
    items: [
      { productId: '2', quantity: 10, productName: 'Bananas', productPrice: 1.49 },
      { productId: '5', quantity: 2, productName: 'Tomatoes', productPrice: 3.49 }
    ],
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '555-987-6543',
      address: '456 Oak Ave, Somewhere, SW 67890'
    },
    status: 'in-progress',
    total: 21.88,
    createdAt: '2023-11-15T10:45:00Z',
    updatedAt: '2023-11-16T14:20:00Z'
  },
  {
    id: 'ORD-1003',
    items: [
      { productId: '4', quantity: 15, productName: 'Potatoes', productPrice: 0.99 },
      { productId: '6', quantity: 2, productName: 'Spinach', productPrice: 2.49 },
      { productId: '8', quantity: 1, productName: 'Bell Peppers', productPrice: 4.49 }
    ],
    customer: {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '555-555-5555',
      address: '789 Pine Ln, Elsewhere, EL 13579'
    },
    status: 'pending',
    total: 24.32,
    createdAt: '2023-11-18T09:00:00Z',
    updatedAt: '2023-11-18T09:00:00Z'
  }
];

// Simulated functions to interact with the "database"
let mockProducts = [...products];
let mockOrders = [...orders];

// Product CRUD operations
export const getAllProducts = () => mockProducts;

export const getProductById = (id: string) => 
  mockProducts.find(product => product.id === id);

export const addProduct = (product: Omit<Product, 'id'>) => {
  const newProduct = {
    ...product,
    id: Math.random().toString(36).substr(2, 9)
  };
  mockProducts.push(newProduct as Product);
  return newProduct;
};

export const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
  mockProducts = mockProducts.map(product => 
    product.id === id ? { ...product, ...updatedProduct } : product
  );
  return mockProducts.find(product => product.id === id);
};

export const deleteProduct = (id: string) => {
  mockProducts = mockProducts.filter(product => product.id !== id);
  return true;
};

// Order CRUD operations
export const getAllOrders = () => mockOrders;

export const getOrderById = (id: string) => 
  mockOrders.find(order => order.id === id);

export const addOrder = (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
  const now = new Date().toISOString();
  const newOrder = {
    ...order,
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: now,
    updatedAt: now
  };
  mockOrders.push(newOrder as Order);
  return newOrder;
};

export const updateOrderStatus = (id: string, status: Order['status']) => {
  mockOrders = mockOrders.map(order => 
    order.id === id 
      ? { ...order, status, updatedAt: new Date().toISOString() } 
      : order
  );
  return mockOrders.find(order => order.id === id);
};
