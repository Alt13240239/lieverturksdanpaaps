import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import emailjs from '@emailjs/browser';

interface OutOfStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OutOfStockDialog = ({ open, onOpenChange }: OutOfStockDialogProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: language === 'nl' ? "Email vereist" : "Email Required",
        description: language === 'nl' ? "Vul je emailadres in" : "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send business notification email
      await emailjs.send(
        'service_b9qa6bp',
        'template_8jsr8qb',
        {
          notify_email: email,
        },
        'YnAmYFbdlBDuSJQLC'
      );

      // Send confirmation email to user
      await emailjs.send(
        'service_b9qa6bp',
        'template_dcy4y8p',
        {
          notify_email: email,
        },
        'YnAmYFbdlBDuSJQLC'
      );

      toast({
        title: language === 'nl' ? "Bedankt!" : "Thank you!",
        description: language === 'nl' ? "We laten je weten wanneer het product weer op voorraad is." : "We'll notify you when the product is back in stock.",
      });
      
      setEmail('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error sending notification:', error);
      toast({
        title: language === 'nl' ? "Fout" : "Error",
        description: language === 'nl' ? "Er is iets misgegaan. Probeer het opnieuw." : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {language === 'nl' ? 'Product niet op voorraad' : 'Product Out of Stock'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {language === 'nl' ? 'Het product is niet op voorraad.' : 'The product is currently out of stock.'}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <Label htmlFor="email" className="whitespace-nowrap">
                {language === 'nl' ? 'Herinner me wanneer het product op voorraad is:' : 'Notify me when the product is available:'}
              </Label>
              <Input
                id="email"
                name="notify_email"
                type="email"
                placeholder={language === 'nl' ? 'Je emailadres' : 'Your email address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? (language === 'nl' ? 'Bezig...' : 'Sending...') : (language === 'nl' ? 'Herinner me' : 'Notify Me')}
              </Button>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                {language === 'nl' ? 'Annuleren' : 'Cancel'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutOfStockDialog;