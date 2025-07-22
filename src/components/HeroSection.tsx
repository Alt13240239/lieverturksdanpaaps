
import React from 'react';
import { Button } from '@/components/ui/button';
import heroImage from '@/images/hero-image.png';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="min-h-screen flex items-center pt-24 pb-12 px-6 md:px-12 bg-cream">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-md leading-relaxed text-charcoal/80">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <Button 
              variant="default"
              className="btn-primary btn-shine"
              onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.button.acquire')}
            </Button>
            <Button 
              variant="outline"
              className="border-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300 btn-shine"
              onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.button.testimonials')}
            </Button>
          </div>
        </div>
        
        <div className="order-1 md:order-2 animate-fade-in">
          <div className="aspect-square relative overflow-hidden bg-cream mb-6">
            <img 
              src="{heroImage}" 
              alt="Liever Turks dan Paaps Penning - Rare Collector's Item" 
              className="object-contain w-full h-full"
            />
            <div className="absolute bottom-4 right-4 bg-cream/90 text-charcoal text-xs py-1 px-3 rounded-sm">
              {t('hero.badge')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
