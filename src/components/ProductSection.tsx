import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductSection = () => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0.01);
  const { toast } = useToast();
  const { addItem } = useCart();
  const { t, language } = useLanguage();
  
  // Product specifications with translations
  const specifications = [
    { name: t('spec.material'), value: "Silver" },
    { name: t('spec.dimensions'), value: "35 mm × 31 mm" },
    { name: t('spec.weight'), value: "11.27 grams" },
    { name: t('spec.inscription'), value: "Liver Tvrcx dan Pavs / Endespit de La Mes" },
    { name: t('spec.age'), value: language === 'nl' ? "Begin 18e eeuw" : "Early 18th Century" },
    { name: t('spec.origin'), value: language === 'nl' ? "Nederland" : "Netherlands" }
  ];
  
  const unitPrice = 0.01; // Base price in euros
  const productId = "penning-001";
  const productName = "Liever Turks dan Paaps Penning";
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
      title: t('cart.added'),
      description: `${quantity} ${t('cart.pennings')} - €${totalPrice.toFixed(2)}`,
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
                  alt="Liever Turks dan Paaps Penning Detail" 
                  className="object-contain w-full h-full rounded-sm" 
                />
              </AspectRatio>
            </div>
          </div>
          
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">{t('product.title')}</h2>
              <p className="text-sm uppercase tracking-wider text-charcoal/60 mb-6">{t('product.subtitle')}</p>
              
              <p className="leading-relaxed mb-6">
                {t('product.description1')}
              </p>
              
              <p className="leading-relaxed mb-6">
                {t('product.description2')}
              </p>
              
              <p className="leading-relaxed mb-6 text-center font-serif italic text-xl">
                "{t('product.quote')}"
              </p>
              
              <p className="leading-relaxed mb-6">
                {t('product.description3')}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">{t('product.specifications')}</h3>
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
                <span className="text-3xl font-serif">€{totalPrice.toFixed(2)}</span>
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
                className="w-full py-6 text-base btn-primary btn-shine"
                onClick={handleAddToCart}
              >
                {t('cart.add')}
              </Button>
              
              <div className="flex justify-between text-xs text-charcoal/60 mt-4">
                <span>{t('cart.freeShipping')}</span>
                <span>{t('cart.returnPolicy')}</span>
                <span>{t('cart.securePayment')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
