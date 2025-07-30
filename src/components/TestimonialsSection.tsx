
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const TestimonialsSection = () => {
  const { t, language } = useLanguage();
  
  const testimonials = [
    {
      quote: language === 'nl' 
        ? "De Liever Turks dan Paaps Penning is het middelpunt van mijn numismatische collectie. De historische betekenis en onberispelijke staat maken het een ware schat."
        : "The Liever Turks dan Paaps Penning is the centerpiece of my numismatic collection. Its historical significance and pristine condition make it a true treasure.",
      author: "Dr. Helena Voss",
      title: language === 'nl' ? "Historicus & Verzamelaar" : "Historian & Collector"
    },
    {
      quote: language === 'nl'
        ? "In mijn 40 jaar als verzamelaar van historische munten ben ik zelden een exemplaar tegengekomen met zulke voortreffelijke details en herkomst. Een opmerkelijke aanwinst."
        : "In my 40 years of collecting historical coins, I've rarely encountered a specimen with such exquisite detail and provenance. A remarkable acquisition.",
      author: "James Whitfield",
      title: language === 'nl' ? "Privé Verzamelaar" : "Private Collector"
    },
    {
      quote: language === 'nl'
        ? "Het authenticatieproces en de documentatie die bij mijn Penning werd geleverd, gaven me volledig vertrouwen in de authenticiteit ervan. Een waardevolle investering voor elke serieuze verzamelaar."
        : "The authentication process and documentation provided with my Penning gave me complete confidence in its authenticity. A worthy investment for any serious collector.",
      author: "Maria Fernandez",
      title: language === 'nl' ? "Lid Numismatische Vereniging" : "Numismatic Society Member"
    }
  ];

  return (
    <section id="testimonials" className="section bg-cream" role="region" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-serif text-center mb-16">{t('testimonials.title')}</h2>
        
        <div className="grid md:grid-cols-3 gap-8" role="list">
          {testimonials.map((testimonial, index) => (
            <article key={index} className="bg-white p-8 animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }} role="listitem">
              <blockquote className="mb-6 italic text-charcoal/80">
                "{testimonial.quote}"
              </blockquote>
              <footer>
                <cite className="font-medium not-italic">{testimonial.author}</cite>
                <p className="text-sm text-charcoal/60">{testimonial.title}</p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
