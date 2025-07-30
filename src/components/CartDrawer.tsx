
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X, ShoppingCart } from 'lucide-react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const CartDrawer = () => {
  const { items, totalPrice, clearCart } = useCart();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const CartItem = ({ item }: { item: any }) => {
    const { updateQuantity, removeItem } = useCart();
  
    return (
      <div className="flex items-center py-3">
        <div className="h-16 w-16 overflow-hidden rounded-md border border-gray-200">
          <img 
            src={item.image} 
            alt={item.name}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-sm font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">€{item.price.toLocaleString()}</p>
        </div>
        <div className="flex items-center ml-4">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="px-2">{item.quantity}</span>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 ml-2" 
          onClick={() => removeItem(item.id)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  };

  const handleCheckout = () => {
    // Redirect to Stripe Payment Link
    window.open('https://buy.stripe.com/aFa9AU72NbDUcyPa2p14401', '_blank');
  };

  const CartContent = () => (
    <>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingCart className="h-12 w-12 text-gray-300" />
          <p className="mt-4 text-gray-500">{t('cart.empty')}</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto pr-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="pt-4">
            <Separator className="my-4" />
            <div className="flex justify-between text-sm font-medium">
              <p>{t('cart.subtotal')}</p>
              <p>€{totalPrice.toLocaleString()}</p>
            </div>
            <Button 
              className="w-full mt-4" 
              onClick={handleCheckout}
            >
              {t('cart.checkout')}
            </Button>
            <Button 
              variant="outline" 
              className="w-full mt-2" 
              onClick={clearCart}
            >
              {t('cart.clear')}
            </Button>
          </div>
        </>
      )}
    </>
  );

  if (isDesktop) {
    return (
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('cart.title')}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh]">
          <CartContent />
        </div>
      </DialogContent>
    );
  }

  return (
    <DrawerContent className="max-h-[90vh]">
      <DrawerHeader>
        <DrawerTitle>{t('cart.title')}</DrawerTitle>
      </DrawerHeader>
      <div className="px-4 overflow-y-auto">
        <CartContent />
      </div>
      <DrawerFooter className="pt-2" />
    </DrawerContent>
  );
};

export default CartDrawer;
