
import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {currentYear} Fresh Harvest Bulk. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Products</Link>
          <Link to="/orders/track" className="text-sm text-muted-foreground hover:text-primary">Track Order</Link>
          <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
