
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-12 px-6 md:px-12 bg-cream">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6">
            Lieverturksdanpaaps Penning
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-md leading-relaxed text-charcoal/80">
            A rare 18th-century collector's masterpiece with exquisite craftsmanship. 
            Only a handful of these historical treasures remain available worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="default"
              className="btn-primary"
              onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Acquire This Rarity
            </Button>
            <Button 
              variant="outline"
              className="border-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
              onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Read Collector Testimonials
            </Button>
          </div>
        </div>
        
        <div className="order-1 md:order-2 animate-fade-in">
          <div className="aspect-square relative overflow-hidden bg-[#efeae3] shadow-lg border border-charcoal/10">
            <img 
              src="/lovable-uploads/0254e1e5-77a9-479e-b130-d83df4650129.png" 
              alt="Lieverturksdanpaaps Penning - Rare Collector's Item" 
              className="object-contain w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/30 to-transparent h-24"></div>
            <div className="absolute bottom-4 right-4 bg-cream/90 text-charcoal text-xs py-1 px-3 rounded-sm">
              Limited Availability
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
