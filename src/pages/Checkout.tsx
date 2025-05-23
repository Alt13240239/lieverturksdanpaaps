
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Checkout = () => {
  const { items, totalPrice, clearCart, updateQuantity, removeItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const CheckoutItem = ({ item }: { item: any }) => {
    return (
      <div className="flex items-center py-4 border-b">
        <div className="h-20 w-20 overflow-hidden rounded-md border">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-charcoal/60">€{item.price.toLocaleString()} {language === 'nl' ? 'per stuk' : 'each'}</p>
        </div>
        <div className="flex items-center ml-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-3">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="ml-4 w-24 text-right">
          €{(item.price * item.quantity).toLocaleString()}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 ml-2"
          onClick={() => removeItem(item.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: language === 'nl' ? "Bestelling Geplaatst" : "Order Placed",
      description: language === 'nl' ? "Bedankt voor uw aankoop!" : "Thank you for your purchase!",
    });
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="container-custom py-32">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-serif mb-6">
              {language === 'nl' ? "Uw Winkelwagen is Leeg" : "Your Cart is Empty"}
            </h1>
            <p className="mb-6">
              {language === 'nl' 
                ? "Het lijkt erop dat u nog geen artikelen aan uw winkelwagen heeft toegevoegd." 
                : "Looks like you haven't added any items to your cart yet."}
            </p>
            <Button onClick={() => navigate('/')}>
              {language === 'nl' ? "Verder Winkelen" : "Continue Shopping"}
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="container-custom py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif mb-10">
            {language === 'nl' ? "Afrekenen" : "Checkout"}
          </h1>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <div className="bg-white border p-6 mb-6">
                <h2 className="text-xl font-serif mb-4">
                  {language === 'nl' ? "Besteloverzicht" : "Order Summary"}
                </h2>
                <div className="space-y-1">
                  {items.map((item) => (
                    <CheckoutItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="bg-white border p-6">
                <h2 className="text-xl font-serif mb-6">
                  {language === 'nl' ? "Verzendgegevens" : "Shipping Information"}
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="firstName">
                      {language === 'nl' ? "Voornaam" : "First Name"}
                    </Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">
                      {language === 'nl' ? "Achternaam" : "Last Name"}
                    </Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="address">
                    {language === 'nl' ? "Adres" : "Address"}
                  </Label>
                  <Input id="address" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="city">
                      {language === 'nl' ? "Plaats" : "City"}
                    </Label>
                    <Input id="city" required />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">
                      {language === 'nl' ? "Postcode" : "Postal Code"}
                    </Label>
                    <Input id="postalCode" required />
                  </div>
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="country">
                    {language === 'nl' ? "Land" : "Country"}
                  </Label>
                  <Input id="country" required />
                </div>
                
                <h2 className="text-xl font-serif mb-6">
                  {language === 'nl' ? "Betaalgegevens" : "Payment Information"}
                </h2>
                
                <div className="mb-6">
                  <Label htmlFor="cardNumber">
                    {language === 'nl' ? "Kaartnummer" : "Card Number"}
                  </Label>
                  <Input 
                    id="cardNumber" 
                    placeholder="1234 5678 9012 3456" 
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="expDate">
                      {language === 'nl' ? "Vervaldatum" : "Expiration Date"}
                    </Label>
                    <Input id="expDate" placeholder="MM/YY" required />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" required />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  {language === 'nl' ? "Aankoop Afronden" : "Complete Purchase"}
                </Button>
              </form>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white border p-6 sticky top-20">
                <h2 className="text-xl font-serif mb-4">
                  {language === 'nl' ? "Besteltotaal" : "Order Total"}
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>
                      {language === 'nl' ? "Subtotaal" : "Subtotal"}
                    </span>
                    <span>€{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      {language === 'nl' ? "Verzending" : "Shipping"}
                    </span>
                    <span>
                      {language === 'nl' ? "Gratis" : "Free"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>
                      {language === 'nl' ? "Totaal" : "Total"}
                    </span>
                    <span>€{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
