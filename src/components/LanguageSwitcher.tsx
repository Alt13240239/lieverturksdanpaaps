
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlobeIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 border-charcoal/50 hover:bg-charcoal/10 hover:text-charcoal"
          >
            <GlobeIcon className="h-4 w-4" />
            <span className="font-medium">{language === 'en' ? 'EN' : 'NL'}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white border border-charcoal/20 shadow-md">
          <DropdownMenuItem 
            onClick={() => setLanguage('en')}
            className={`${language === 'en' ? 'font-medium bg-gray-100' : ''} cursor-pointer hover:bg-gray-100`}
          >
            {language === 'en' && <span className="mr-2">✓</span>}
            {t('language.en')}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setLanguage('nl')}
            className={`${language === 'nl' ? 'font-medium bg-gray-100' : ''} cursor-pointer hover:bg-gray-100`}
          >
            {language === 'nl' && <span className="mr-2">✓</span>}
            {t('language.nl')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;
