
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Set page-specific meta information for SEO
    document.title = language === 'nl' 
      ? "Liever Turks dan Paaps Penning | Zeldzame Nederlandse Geuzenpenning Kopen"
      : "Liever Turks dan Paaps Penning | Rare Dutch Historical Coin for Collectors";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        language === 'nl'
          ? "Authentieke Liever Turks dan Paaps Geuzenpenning uit de Nederlandse Opstand. Zeldzame 17e-18e eeuwse zilveren penning voor verzamelaars. Inclusief certificaat van echtheid."
          : "Authentic Liever Turks dan Paaps Geuzenpenning from the Dutch Revolt. Rare 17th-18th century silver coin for collectors. Certificate of authenticity included."
      );
    }
    
    // Update HTML lang attribute based on language
    document.documentElement.lang = language;
  }, [language]);
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <HeroSection />
        <ProductSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
