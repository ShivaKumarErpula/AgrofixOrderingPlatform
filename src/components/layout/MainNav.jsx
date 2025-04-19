
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export function MainNav() {
  const location = useLocation();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { items } = useCart();
  
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">Fresh Harvest Bulk</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary font-semibold' : 'text-foreground/60'
              }`}
            >
              Products
            </Link>
            
            <Link
              to="/orders/track"
              className={`transition-colors hover:text-primary ${
                isActive('/orders/track') ? 'text-primary font-semibold' : 'text-foreground/60'
              }`}
            >
              Track Order
            </Link>
            
            {isAdmin && (
              <>
                <Link
                  to="/admin/orders"
                  className={`transition-colors hover:text-primary ${
                    isActive('/admin/orders') ? 'text-primary font-semibold' : 'text-foreground/60'
                  }`}
                >
                  Manage Orders
                </Link>
                <Link
                  to="/admin/products"
                  className={`transition-colors hover:text-primary ${
                    isActive('/admin/products') ? 'text-primary font-semibold' : 'text-foreground/60'
                  }`}
                >
                  Manage Products
                </Link>
              </>
            )}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link to="/" className="mr-6 flex items-center space-x-2 md:hidden">
              <span className="font-bold">Fresh Harvest</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative mr-2">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={logout} className="flex items-center gap-1">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
