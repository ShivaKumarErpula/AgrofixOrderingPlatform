
import React, { useState } from 'react';
import { Search, Truck, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getOrderById } from '@/data/mockData';
import { Order } from '@/types';
import { Separator } from '@/components/ui/separator';

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }
    
    const order = getOrderById(orderId);
    
    if (order) {
      setSearchedOrder(order);
      setError('');
    } else {
      setSearchedOrder(null);
      setError('Order not found. Please check the order ID and try again.');
    }
  };
  
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6 text-secondary" />;
      case 'in-progress':
        return <Truck className="h-6 w-6 text-primary" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-primary" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Your order has been received and is pending processing.';
      case 'in-progress':
        return 'Your order is being processed and prepared for delivery.';
      case 'delivered':
        return 'Your order has been delivered successfully.';
      default:
        return '';
    }
  };
  
  return (
    <div className="container py-8 max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
        <p className="text-muted-foreground">
          Enter your order ID to check the current status of your delivery.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Enter your order ID (e.g., ORD-1001)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Track Order</Button>
          </form>
          
          {error && (
            <div className="mt-4 flex items-center text-destructive">
              <AlertTriangle className="mr-2 h-4 w-4" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>
      
      {searchedOrder && (
        <Card>
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Order #{searchedOrder.id}</h2>
                <div className="flex items-center gap-2">
                  {getStatusIcon(searchedOrder.status)}
                  <span className="font-medium capitalize">{searchedOrder.status}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground">
                {getStatusText(searchedOrder.status)}
              </p>
              
              <div className="flex justify-between text-sm mt-2">
                <span className="text-muted-foreground">
                  Order Date: {new Date(searchedOrder.createdAt).toLocaleDateString()}
                </span>
                <span className="text-muted-foreground">
                  Last Updated: {new Date(searchedOrder.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Delivery Address</h3>
              <p>{searchedOrder.customer.name}</p>
              <p>{searchedOrder.customer.phone}</p>
              <p>{searchedOrder.customer.email}</p>
              <p className="whitespace-pre-line">{searchedOrder.customer.address}</p>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="font-semibold mb-2">Order Items</h3>
              <div className="space-y-3">
                {searchedOrder.items.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <div>
                      <span className="font-medium">{item.productName}</span>
                      <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                    </div>
                    <span>${(item.productPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${searchedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
