
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlobeIcon } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'nl' : 'en');
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleLanguageToggle}
      className="gap-2 border-charcoal/50 hover:bg-charcoal/10 hover:text-charcoal"
    >
      <GlobeIcon className="h-4 w-4" />
      <span className="font-medium">{language === 'en' ? 'NL' : 'EN'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
