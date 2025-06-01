
import React from 'react';
import { cn } from '@/lib/utils';
import CartIcon from '@/components/CartIcon';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = ({ className }: { className?: string }) => {
  const { t } = useLanguage();
  
  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 bg-cream/90 backdrop-blur-sm', className)}>
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-lg md:text-xl font-serif font-medium">
          <a href="/" className="text-charcoal hover:text-gold transition-colors">Liever Turks dan Paaps</a>
        </div>
        
        <nav className="hidden md:flex space-x-8 text-sm">
          <a href="#product" className="hover:text-gold transition-colors">{t('nav.product')}</a>
          <a href="#testimonials" className="hover:text-gold transition-colors">{t('nav.testimonials')}</a>
          <a href="#contact" className="hover:text-gold transition-colors">{t('nav.contact')}</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <CartIcon />
          <a 
            href="#product" 
            className="text-sm py-1.5 px-4 border border-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
          >
            {t('nav.purchase')}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
