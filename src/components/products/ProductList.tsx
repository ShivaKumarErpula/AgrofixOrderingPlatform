
import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/types';
import { EmptyState } from '@/components/ui/EmptyState';
import { Package } from 'lucide-react';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (!products.length) {
    return (
      <EmptyState
        title="No products found"
        description="There are no products available at the moment."
        icon={<Package className="h-12 w-12 text-muted-foreground" />}
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
