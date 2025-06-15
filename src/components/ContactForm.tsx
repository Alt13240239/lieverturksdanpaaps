
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create mailto link with form data
      const subject = encodeURIComponent('Contact Form Submission - Liever Turks dan Paaps');
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}
      `);
      
      const mailtoLink = `mailto:info@lieverturksdanpaaps.nl?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      // Hide thank you message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-4">
        <div className="bg-gold/10 border border-gold/20 rounded-md p-4 mb-4">
          <p className="text-gold font-medium">
            {t('contact.thankYou')}
          </p>
          <p className="text-cream/70 text-sm mt-1">
            {t('contact.response')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className="font-medium mb-4">{t('contact.title')}</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-cream/70 text-sm">
            {t('contact.name')}
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 bg-cream/5 border-cream/20 text-cream placeholder:text-cream/50 focus:border-gold focus:ring-gold/20"
            placeholder={t('contact.namePlaceholder')}
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-cream/70 text-sm">
            {t('contact.email')} <span className="text-gold">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 bg-cream/5 border-cream/20 text-cream placeholder:text-cream/50 focus:border-gold focus:ring-gold/20"
            placeholder={t('contact.emailPlaceholder')}
          />
        </div>
        
        <div>
          <Label htmlFor="message" className="text-cream/70 text-sm">
            {t('contact.message')}
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="mt-1 bg-cream/5 border-cream/20 text-cream placeholder:text-cream/50 focus:border-gold focus:ring-gold/20 resize-none"
            placeholder={t('contact.messagePlaceholder')}
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting || !formData.email}
          className="w-full bg-gold hover:bg-gold/90 text-charcoal font-medium py-2 px-4 rounded-md transition-colors"
        >
          {isSubmitting ? t('contact.sending') : t('contact.send')}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
