
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Clock, Truck, Search, Eye, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { getAllOrders, updateOrderStatus } from '@/data/mockData';
import { Order } from '@/types';
import { useToast } from '@/components/ui/use-toast';

export default function ManageOrdersPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Protected route - redirect if not admin
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  const orders = getAllOrders();
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    try {
      updateOrderStatus(orderId, newStatus);
      
      // Update the selected order if it's the one being viewed
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          status: newStatus,
          updatedAt: new Date().toISOString()
        });
      }
      
      toast({
        title: "Status updated",
        description: `Order ${orderId} has been updated to ${newStatus}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
    }
  };
  
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            <Truck className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        );
      case 'delivered':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            <Check className="mr-1 h-3 w-3" />
            Delivered
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or customer info..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select 
            value={statusFilter} 
            onValueChange={(value) => setStatusFilter(value as Order['status'] | 'all')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Total</TableHead>
              <TableHead className="hidden md:table-cell">Items</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No orders found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer.name}</div>
                      <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                      
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleUpdateStatus(order.id, value as Order['status'])}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Order details dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Order #{selectedOrder.id}</span>
                  {getStatusBadge(selectedOrder.status)}
                </DialogTitle>
                <DialogDescription>
                  Placed on {formatDate(selectedOrder.createdAt)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6 py-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">Name:</span> {selectedOrder.customer.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedOrder.customer.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedOrder.customer.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Delivery Address</h3>
                  <p className="whitespace-pre-line">{selectedOrder.customer.address}</p>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="font-semibold mb-3">Order Items</h3>
                  <div className="rounded border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item) => (
                          <TableRow key={item.productId}>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell>${item.productPrice.toFixed(2)}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell className="text-right">
                              ${(item.quantity * item.productPrice).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} className="text-right font-semibold">
                            Total
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            ${selectedOrder.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="font-semibold mb-2">Update Status</h3>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedOrder.status === 'pending' ? 'default' : 'outline'}
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'pending')}
                      className="flex-1"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Pending
                    </Button>
                    <Button
                      variant={selectedOrder.status === 'in-progress' ? 'default' : 'outline'}
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'in-progress')}
                      className="flex-1"
                    >
                      <Truck className="mr-2 h-4 w-4" />
                      In Progress
                    </Button>
                    <Button
                      variant={selectedOrder.status === 'delivered' ? 'default' : 'outline'}
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'delivered')}
                      className="flex-1"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Delivered
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
