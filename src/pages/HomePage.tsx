
import React, { useState } from 'react';
import { Leaf, Search } from 'lucide-react';
import { ProductList } from '@/components/products/ProductList';
import { getAllProducts } from '@/data/mockData';
import { Input } from '@/components/ui/input';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const allProducts = getAllProducts();
  
  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center">
          <Leaf className="mr-2 h-8 w-8" /> Fresh Harvest Bulk
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          High-quality fruits and vegetables for bulk orders. Perfect for restaurants, 
          schools, and businesses looking for fresh produce delivered.
        </p>
      </div>
      
      <div className="relative mb-6 max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <ProductList products={filteredProducts} />
    </div>
  );
}
