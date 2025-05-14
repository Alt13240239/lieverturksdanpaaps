
import React from 'react';
import { cn } from '@/lib/utils';
import CartIcon from '@/components/CartIcon';

const Navbar = ({ className }: { className?: string }) => {
  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 bg-cream/90 backdrop-blur-sm', className)}>
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-xl font-serif font-medium">
          <a href="/" className="text-charcoal hover:text-gold transition-colors">L·Penning</a>
        </div>
        
        <nav className="hidden md:flex space-x-8 text-sm">
          <a href="#product" className="hover:text-gold transition-colors">The Penning</a>
          <a href="#testimonials" className="hover:text-gold transition-colors">Testimonials</a>
          <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <CartIcon />
          <a 
            href="#product" 
            className="text-sm py-1.5 px-4 border border-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
          >
            Purchase
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
