
import React from 'react';

const testimonials = [
  {
    quote: "The Lieverturksdanpaaps Penning is the centerpiece of my numismatic collection. Its historical significance and pristine condition make it a true treasure.",
    author: "Dr. Helena Voss",
    title: "Historian & Collector"
  },
  {
    quote: "In my 40 years of collecting historical coins, I've rarely encountered a specimen with such exquisite detail and provenance. A remarkable acquisition.",
    author: "James Whitfield",
    title: "Private Collector"
  },
  {
    quote: "The authentication process and documentation provided with my Penning gave me complete confidence in its authenticity. A worthy investment for any serious collector.",
    author: "Maria Fernandez",
    title: "Numismatic Society Member"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section bg-cream">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-16">From Our Collectors</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <blockquote className="mb-6 italic text-charcoal/80">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-charcoal/60">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
