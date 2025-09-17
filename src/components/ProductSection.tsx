import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import OutOfStockDialog from '@/components/OutOfStockDialog';

const ProductSection = () => {
  const { t, language } = useLanguage();
  const [showOutOfStockDialog, setShowOutOfStockDialog] = useState(false);
  
  // Stock availability - set to false to show out of stock behavior
  const IN_STOCK = false;
  
  // Product specifications with translations
  const specifications = [
    { name: t('spec.material'), value: "Silver" },
    { name: t('spec.dimensions'), value: "35 mm × 31 mm" },
    { name: t('spec.weight'), value: "11.27 grams" },
    { name: t('spec.inscription'), value: "Liver Tvrcx dan Pavs / Endespit de La Mes" },
    { name: t('spec.age'), value: language === 'nl' ? "Begin 18e eeuw" : "Early 18th Century" },
    { name: t('spec.origin'), value: language === 'nl' ? "Nederland" : "Netherlands" }
  ];
  
  const unitPrice = 0.50; // Base price in euros
  const stripePaymentUrl = "https://buy.stripe.com/eVq5kE3QB5fwgP53E114402";

  const handleBuyNow = () => {
    if (IN_STOCK) {
      window.open(stripePaymentUrl, '_blank');
    } else {
      setShowOutOfStockDialog(true);
    }
  };

  return (
    <main>
      <section id="product" className="section bg-white" role="main">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <figure>
              <div className="aspect-square overflow-hidden">
                <AspectRatio ratio={1/1} className="bg-white">
                  <img 
                    src="/lovable-uploads/0254e1e5-77a9-479e-b130-d83df4650129.png" 
                    alt="Authentieke Liever Turks dan Paaps Geuzenpenning - Nederlandse Opstand zilveren penning detail foto" 
                    className="object-contain w-full h-full rounded-sm"
                    loading="lazy"
                    width="400"
                    height="400"
                  />
                </AspectRatio>
              </div>
            </figure>
            
            <article className="space-y-10">
              <header>
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
              </header>
            
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
              <div className="flex justify-center">
                <span className="text-3xl font-serif">€{unitPrice.toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full py-6 text-base btn-primary btn-shine"
                onClick={handleBuyNow}
              >
                {t('cart.add')}
              </Button>
              
              <div className="text-center text-sm text-charcoal/60 mt-4">
                <span>{t('cart.quantityNote')}</span>
              </div>
            </div>
            </article>
          </div>
        </div>
      </section>
      
      <OutOfStockDialog 
        open={showOutOfStockDialog} 
        onOpenChange={setShowOutOfStockDialog} 
      />
    </main>
  );
};

export default ProductSection;
