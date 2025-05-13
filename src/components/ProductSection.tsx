
import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; 

const ProductSection = () => {
  const [quantity, setQuantity] = useState(1);
  
  const increaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };
  
  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  return (
    <section id="product" className="section bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">The Penning</h2>
              <p className="text-sm uppercase tracking-wider text-charcoal/60 mb-6">Limited Edition</p>
              <p className="leading-relaxed mb-6">
                The Lieverturksdanpaaps Penning is a rare bronze collector's coin dating back to the early 18th century. 
                Each piece features intricate engravings that showcase the exceptional craftsmanship of the era.
              </p>
              <p className="leading-relaxed mb-6">
                Hand-selected by our expert numismatists, every penning in our collection has been authenticated 
                and comes with a certificate of provenance detailing its unique history.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Specifications</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between border-b pb-2">
                  <span>Material</span>
                  <span className="text-right">Bronze</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Diameter</span>
                  <span className="text-right">42mm</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Weight</span>
                  <span className="text-right">38g</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Age</span>
                  <span className="text-right">Early 18th Century</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Condition</span>
                  <span className="text-right">Excellent</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-8 p-8 bg-cream/50">
            <div className="aspect-square overflow-hidden bg-cream">
              <img 
                src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=1200&h=1200&crop=entropy" 
                alt="Lieverturksdanpaaps Penning Detail" 
                className="object-cover w-full h-full" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-serif">€4,950</span>
                <div className="flex items-center border border-charcoal">
                  <button 
                    className="px-3 py-2 border-r border-charcoal"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button 
                    className="px-3 py-2 border-l border-charcoal"
                    onClick={increaseQuantity}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <Button 
                className="w-full btn-primary"
                onClick={() => alert(`You're purchasing ${quantity} Penning(s). This would proceed to checkout in a real store.`)}
              >
                Purchase Now
              </Button>
              <p className="text-xs text-center mt-4 text-charcoal/60">
                Free shipping worldwide • 30-day return policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
