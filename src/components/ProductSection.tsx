
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/contexts/CartContext';

// Product specifications
const specifications = [
  { name: "Material", value: "Bronze" },
  { name: "Diameter", value: "42mm" },
  { name: "Weight", value: "38g" },
  { name: "Age", value: "Early 18th Century" },
  { name: "Condition", value: "Excellent" },
  { name: "Origin", value: "Netherlands" }
];

const ProductSection = () => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(5);
  const { toast } = useToast();
  const { addItem } = useCart();
  
  const unitPrice = 5; // Base price in euros
  const productId = "penning-001";
  const productName = "Lieverturksdanpaaps Penning";
  const productImage = "/lovable-uploads/0254e1e5-77a9-479e-b130-d83df4650129.png";
  
  useEffect(() => {
    // Update total price when quantity changes
    setTotalPrice(unitPrice * quantity);
  }, [quantity, unitPrice]);
  
  const increaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };
  
  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    addItem({
      id: productId,
      name: productName,
      price: unitPrice,
      quantity: quantity,
      image: productImage
    });

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
          <div>
            <div className="aspect-square overflow-hidden">
              <AspectRatio ratio={1/1} className="bg-white">
                <img 
                  src="/lovable-uploads/0254e1e5-77a9-479e-b130-d83df4650129.png" 
                  alt="Lieverturksdanpaaps Penning Detail" 
                  className="object-contain w-full h-full rounded-sm" 
                />
              </AspectRatio>
            </div>
          </div>
          
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">The Penning</h2>
              <p className="text-sm uppercase tracking-wider text-charcoal/60 mb-6">Limited Edition • Museum Quality</p>
              
              <p className="leading-relaxed mb-6">
                One of the most striking artifacts from the Dutch Revolt is the Geuzenpenning, a silver medal worn by the Watergeuzen (Sea Beggars)—Protestant privateers who fought against Spanish Catholic rule in the 16th century.
              </p>
              
              <p className="leading-relaxed mb-6">
                A particularly provocative version of this medal bears the inscription:
              </p>
              
              <p className="leading-relaxed mb-6 text-center font-serif italic text-xl">
                "Liever Turks dan Paaps"<br/>
                ("Rather Turkish than Papist")
              </p>
              
              <p className="leading-relaxed mb-6">
                This bold statement captured the intense anti-Catholic sentiment of the time. It reflected a radical preference for the perceived religious tolerance of the Muslim Ottoman Empire over the oppressive Catholic regime of the Spanish crown and the Inquisition.
              </p>
              
              <div className="bg-cream/30 p-6 mb-6">
                <h3 className="font-medium mb-3">✦ Design Features:</h3>
                <ul className="space-y-2">
                  <li><span className="font-medium">Front:</span> Often crescent-shaped, inscribed with "Liver Turcx dan Paus"—a deliberate misspelling in archaic Dutch.</li>
                  <li><span className="font-medium">Back:</span> Some versions include the phrase "En Despit de la Mes" ("In spite of the Mass"), reinforcing the rejection of Catholic ritual.</li>
                  <li><span className="font-medium">Material:</span> Typically silver or lead.</li>
                  <li><span className="font-medium">Worn by:</span> Geuzen fighters and sympathizers as a symbol of rebellion and Protestant identity.</li>
                </ul>
              </div>
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
