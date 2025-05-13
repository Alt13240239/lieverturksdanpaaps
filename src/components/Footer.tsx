
import React from 'react';
import { Instagram, Facebook, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-charcoal text-cream py-16 px-6 md:px-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif mb-4">L·Penning</h3>
            <p className="max-w-md text-cream/70">
              Curating exceptional historical artifacts for discerning collectors since 1995.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-cream/70">
              <li><a href="#" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <address className="not-italic text-cream/70">
              <p>Amsterdam, Netherlands</p>
              <p className="mt-2">info@lpenning.com</p>
              <p className="mt-2">+31 20 123 4567</p>
            </address>
            
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-cream/70 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="text-cream/70 hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-cream/70 hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="mailto:info@lpenning.com" aria-label="Email" className="text-cream/70 hover:text-gold transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cream/20 mt-12 pt-8 text-sm text-cream/50 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Lieverturksdanpaaps Penning. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Designed with care for collectors worldwide</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
