
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContactForm from '@/components/ContactForm';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer id="contact" className="bg-charcoal text-cream py-16 px-6 md:px-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h3 className="text-xl md:text-2xl font-serif mb-4 leading-tight">Liever Turks dan Paaps</h3>
            <p className="max-w-md text-cream/70">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <ContactForm />
          </div>
        </div>
        
        <div className="border-t border-cream/20 mt-12 pt-8 text-sm text-cream/50 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Liever Turks dan Paaps. {t('footer.rights')}</p>
          <p className="mt-4 md:mt-0">{t('footer.designed')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
