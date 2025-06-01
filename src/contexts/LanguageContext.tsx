import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'nl';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, Record<string, string>>;
  t: (key: string) => string;
};

const translations = {
  en: {
    // Navigation
    'nav.product': 'The Penning',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'nav.purchase': 'Purchase',
    
    // Hero Section
    'hero.title': 'Liever Turks dan Paaps Penning',
    'hero.description': 'In the heat of rebellion, Dutch freedom fighters declared \'Liever Turks dan Paaps\' (Rather Turkish than Papist) —a radical cry for liberty etched into silver. The Geuzenpenning wasn\'t just a medal—it was a defiant symbol of resistance, religious freedom, and the fight against tyranny.',
    'hero.button.acquire': 'Acquire This Rarity',
    'hero.button.testimonials': 'Read Testimonials',
    'hero.badge': 'Limited Availability',
    
    // Product Section
    'product.title': 'The Penning',
    'product.subtitle': 'Limited Edition • Museum Quality',
    'product.description1': 'One of the most striking artifacts from the Dutch Revolt is the Geuzenpenning, a silver medal worn by the Watergeuzen (Sea Beggars)—Protestant privateers who fought against Spanish Catholic rule in the 16th century.',
    'product.description2': 'A particularly provocative version of this medal bears the inscription:',
    'product.quote': 'Liever Turks dan Paaps',
    'product.quote.translation': '',
    'product.description3': 'This bold statement captured the intense anti-Catholic sentiment of the time. It reflected a radical preference for the perceived religious tolerance of the Muslim Ottoman Empire over the oppressive Catholic regime of the Spanish crown and the Inquisition.',
    
    // Specifications
    'product.specifications': 'Specifications',
    'spec.material': 'Material',
    'spec.dimensions': 'Dimensions',
    'spec.weight': 'Weight',
    'spec.inscription': 'Inscription',
    'spec.age': 'Age',
    'spec.origin': 'Origin',
    
    // Cart
    'cart.add': 'Add to Cart',
    'cart.freeShipping': 'Free worldwide shipping',
    'cart.returnPolicy': '30-day return policy',
    'cart.securePayment': 'Secure payment',
    
    // Testimonials
    'testimonials.title': 'From Our Collectors',
    
    // Footer
    'footer.description': 'Curating exceptional historical artifacts for discerning collectors since 2025.',
    'footer.links': 'Quick Links',
    'footer.about': 'About Us',
    'footer.faq': 'FAQ',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.designed': 'Designed with care for collectors worldwide',
    
    // Cart Drawer
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.subtotal': 'Subtotal',
    'cart.checkout': 'Proceed to Checkout',
    'cart.clear': 'Clear Cart',
    'cart.added': 'Added to Cart',
    'cart.pennings': 'Penning(s) added',
    
    // Language
    'language': 'Language',
    'language.nl': 'Nederlands',
    'language.en': 'English',
  },
  nl: {
    // Navigation
    'nav.product': 'De Penning',
    'nav.testimonials': 'Getuigenissen',
    'nav.contact': 'Contact',
    'nav.purchase': 'Kopen',
    
    // Hero Section
    'hero.title': 'Liever Turks dan Paaps Penning',
    'hero.description': 'In het vuur van rebellie zeiden de Nederlandse vrijheidsstrijders \'Liever Turks dan Paaps\' — een radicale kreet voor vrijheid gegraveerd in zilver. De Geuzenpenning was niet zomaar een medaille — het was een uitdagend symbool van verzet, religieuze vrijheid en de strijd tegen tirannie.',
    'hero.button.acquire': 'Verwerf Deze Zeldzaamheid',
    'hero.button.testimonials': 'Lees Getuigenissen',
    'hero.badge': 'Beperkte Beschikbaarheid',
    
    // Product Section
    'product.title': 'De Penning',
    'product.subtitle': 'Gelimiteerde Editie • Museumkwaliteit',
    'product.description1': 'Een van de meest opvallende artefacten uit de Nederlandse Opstand is de Geuzenpenning, een zilveren medaille gedragen door de Watergeuzen — protestantse kapers die vochten tegen de Spaanse katholieke heerschappij in de 16e eeuw.',
    'product.description2': 'Een bijzonder provocerende versie van deze medaille draagt de inscriptie:',
    'product.quote': 'Liever Turks dan Paaps',
    'product.quote.translation': '',
    'product.description3': 'Deze gewaagde uitspraak weerspiegelde het intense anti-katholieke sentiment van die tijd. Het toonde een radicale voorkeur voor de vermeende religieuze tolerantie van het Islamitische Ottomaanse Rijk boven het onderdrukkende katholieke regime van de Spaanse kroon en de Inquisitie.',
    
    // Specifications
    'product.specifications': 'Specificaties',
    'spec.material': 'Materiaal',
    'spec.dimensions': 'Afmetingen',
    'spec.weight': 'Gewicht',
    'spec.inscription': 'Inscriptie',
    'spec.age': 'Tijdperk',
    'spec.origin': 'Herkomst',
    
    // Cart
    'cart.add': 'Aan Winkelwagen Toevoegen',
    'cart.freeShipping': 'Gratis wereldwijde verzending',
    'cart.returnPolicy': '30 dagen retourbeleid',
    'cart.securePayment': 'Veilige betaling',
    
    // Testimonials
    'testimonials.title': 'Van Onze Verzamelaars',
    
    // Footer
    'footer.description': 'We verzorgen uitzonderlijke historische artefacten voor verzamelaars sinds 2025.',
    'footer.links': 'Snelle Links',
    'footer.about': 'Over Ons',
    'footer.faq': 'FAQ',
    'footer.privacy': 'Privacybeleid',
    'footer.terms': 'Servicevoorwaarden',
    'footer.contact': 'Contact',
    'footer.rights': 'Alle rechten voorbehouden.',
    'footer.designed': 'Met zorg ontworpen voor verzamelaars wereldwijd',
    
    // Cart Drawer
    'cart.title': 'Uw Winkelwagen',
    'cart.empty': 'Uw winkelwagen is leeg',
    'cart.subtotal': 'Subtotaal',
    'cart.checkout': 'Doorgaan naar Afrekenen',
    'cart.clear': 'Winkelwagen Legen',
    'cart.added': 'Toegevoegd aan Winkelwagen',
    'cart.pennings': 'Penning(en) toegevoegd',
    
    // Language
    'language': 'Taal',
    'language.nl': 'Nederlands',
    'language.en': 'English',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'nl')) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, translations, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
