
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";

// Product specifications
const specifications = [
  { name: "Material", value: "Bronze" },
  { name: "Diameter", value: "42mm" },
  { name: "Weight", value: "38g" },
  { name: "Age", value: "Early 18th Century" },
  { name: "Condition", value: "Excellent" },
  { name: "Origin", value: "Netherlands" },
  { name: "Rarity", value: "Very Rare (< 50 known specimens)" },
  { name: "Authentication", value: "Certificate of Authenticity Included" }
];

const ProductSection = () => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(4950);
  const { toast } = useToast();
  
  const unitPrice = 4950; // Base price in euros
  
  useEffect(() => {
    // Update total price when quantity changes
    setTotalPrice(unitPrice * quantity);
  }, [quantity]);
  
  const increaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };
  
  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} Penning(s) added - €${totalPrice.toLocaleString()}`,
      duration: 3000,
    });
  };

  return (
    <section id="product" className="section bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="aspect-square overflow-hidden">
              <AspectRatio ratio={1/1} className="bg-cream border border-charcoal/10">
                <img 
                  src="https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=1200&h=1200&crop=entropy" 
                  alt="Lieverturksdanpaaps Penning Detail" 
                  className="object-cover w-full h-full rounded-sm" 
                />
              </AspectRatio>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((img) => (
                <div 
                  key={img} 
                  className="aspect-square bg-cream border border-charcoal/10 cursor-pointer overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <img 
                    src={`https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=400&h=400&crop=entropy&sat=${-20 * img}`} 
                    alt={`Lieverturksdanpaaps Penning Angle ${img}`} 
                    className="object-cover w-full h-full" 
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">The Penning</h2>
              <p className="text-sm uppercase tracking-wider text-charcoal/60 mb-6">Limited Edition • Museum Quality</p>
              <p className="leading-relaxed mb-6">
                The Lieverturksdanpaaps Penning is an exquisite bronze collector's coin dating back to the early 18th century. 
                Each piece features intricate engravings that showcase the exceptional craftsmanship of master Dutch artisans from a bygone era.
              </p>
              <p className="leading-relaxed mb-6">
                Hand-selected by our expert numismatists, every penning in our collection has been meticulously authenticated 
                and comes with a detailed certificate of provenance, tracing its unique history through the centuries.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between border-b pb-2">
                    <span className="text-charcoal/70">{spec.name}</span>
                    <span className="text-right font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="bg-charcoal/10" />
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-serif">€{totalPrice.toLocaleString()}</span>
                <div className="flex items-center border border-charcoal">
                  <button 
                    className="w-10 h-10 flex items-center justify-center border-r border-charcoal/50 hover:bg-charcoal/5 transition-colors"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button 
                    className="w-10 h-10 flex items-center justify-center border-l border-charcoal/50 hover:bg-charcoal/5 transition-colors"
                    onClick={increaseQuantity}
                    disabled={quantity >= 10}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <Button 
                className="w-full py-6 text-base btn-primary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              
              <div className="flex justify-between text-xs text-charcoal/60 mt-4">
                <span>Free worldwide shipping</span>
                <span>30-day return policy</span>
                <span>Secure payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
