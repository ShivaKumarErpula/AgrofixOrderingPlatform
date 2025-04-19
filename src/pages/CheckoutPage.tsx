
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { addOrder } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, total, clearCart } = useCart();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  if (!items.length && !orderComplete) {
    navigate('/cart');
    return null;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create new order
      const newOrder = addOrder({
        items,
        customer: customerInfo,
        status: 'pending',
        total
      });
      
      setOrderId(newOrder.id);
      setOrderComplete(true);
      clearCart();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (orderComplete) {
    return (
      <div className="container max-w-md py-12">
        <Card className="p-6 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully</h1>
          <p className="text-muted-foreground mb-4">
            Your order has been received and is being processed.
          </p>
          <div className="bg-muted p-4 rounded-md mb-6">
            <p className="font-medium">Order Reference</p>
            <p className="text-2xl font-bold">{orderId}</p>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Please save this order reference number to track your order status.
          </p>
          <div className="flex flex-col gap-4">
            <Link to="/orders/track">
              <Button className="w-full">Track Your Order</Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2"
          onClick={() => navigate('/cart')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Delivery Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={customerInfo.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={customerInfo.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={customerInfo.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter your complete delivery address"
                  value={customerInfo.address}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </div>
        
        <div>
          <div className="rounded-lg border shadow-sm sticky top-24">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.productId} className="flex justify-between py-2">
                    <span>
                      {item.productName} <span className="text-muted-foreground">x{item.quantity}</span>
                    </span>
                    <span>${(item.productPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
