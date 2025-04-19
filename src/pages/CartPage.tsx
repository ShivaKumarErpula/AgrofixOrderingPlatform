
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBasket, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { EmptyState } from '@/components/ui/EmptyState';
import { Input } from '@/components/ui/input';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();
  
  if (!items.length) {
    return (
      <div className="container py-12">
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added any products to your cart yet."
          icon={<ShoppingBasket className="h-12 w-12 text-muted-foreground" />}
          action={
            <Link to="/">
              <Button className="mt-4">Browse Products</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-lg border shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center py-4">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.productName}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.productPrice.toFixed(2)} each
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value) && value > 0) {
                              updateQuantity(item.productId, value);
                            }
                          }}
                          className="h-8 w-16 border-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      
                      <div className="w-20 text-right">
                        ${(item.productPrice * item.quantity).toFixed(2)}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="rounded-lg border shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <Button className="w-full" size="lg" asChild>
                  <Link to="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
