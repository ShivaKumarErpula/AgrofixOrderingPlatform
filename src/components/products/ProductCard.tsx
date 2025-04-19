
import React from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, items, updateQuantity } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  
  const cartItem = items.find(item => item.productId === product.id);
  const isInCart = !!cartItem;
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };
  
  const handleUpdateCartQuantity = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-lg">${product.price.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">per {product.unit}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isInCart ? (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleUpdateCartQuantity(Math.max(1, cartItem.quantity - 1))}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="w-12 text-center">{cartItem.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleUpdateCartQuantity(cartItem.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            <Button variant="default" className="ml-2" onClick={() => addToCart(product, 1)}>
              Add more
            </Button>
          </div>
        ) : (
          <div className="flex w-full items-center">
            <div className="flex items-center mr-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleDecrement}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleIncrement}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            <Button className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
