
import React from 'react';
import { cn } from '@/lib/utils';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = ({ className }: { className?: string }) => {
  const { t } = useLanguage();
  
  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 bg-cream/90 backdrop-blur-sm', className)} role="banner">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-lg md:text-xl font-serif font-medium">
          <a href="/" className="text-charcoal hover:text-gold transition-colors" aria-label="Liever Turks dan Paaps homepage">Liever Turks dan Paaps</a>
        </div>
        
        <nav className="hidden md:flex space-x-8 text-sm" role="navigation" aria-label="Main navigation">
          <button 
            onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-gold transition-colors"
            aria-label="Navigate to product section"
          >
            {t('nav.product')}
          </button>
          <button 
            onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-gold transition-colors"
            aria-label="Navigate to testimonials section"
          >
            {t('nav.testimonials')}
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-gold transition-colors"
            aria-label="Navigate to contact section"
          >
            {t('nav.contact')}
          </button>
        </nav>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
