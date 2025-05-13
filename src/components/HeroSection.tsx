
import React from 'react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-12 px-6 md:px-12 bg-cream">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6">
            Lieverturksdanpaaps Penning
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-md leading-relaxed text-charcoal/80">
            A rare collector's item of exceptional craftsmanship, coveted by historians and numismatists worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#product" 
              className="btn-primary inline-block text-center"
            >
              Explore the Collection
            </a>
            <a 
              href="#testimonials" 
              className="py-3 px-8 border border-charcoal text-center hover:bg-charcoal hover:text-cream transition-all duration-300"
            >
              Read Testimonials
            </a>
          </div>
        </div>
        
        <div className="order-1 md:order-2 animate-fade-in">
          <div className="aspect-square relative overflow-hidden bg-[#efeae3]">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1426&h=1426&crop=entropy" 
              alt="Lieverturksdanpaaps Penning" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 border border-charcoal/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
