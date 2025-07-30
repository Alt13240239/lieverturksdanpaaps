/**
 * Performance optimization utilities for better SEO
 */

/**
 * Lazy load images when they come into viewport
 */
export const observeImageLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  // Preload hero image
  const heroImage = new Image();
  heroImage.src = '/lovable-uploads/0254e1e5-77a9-479e-b130-d83df4650129.png';
  
  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);
};

/**
 * Optimize Core Web Vitals
 */
export const optimizeWebVitals = () => {
  // Reduce layout shift by setting image dimensions
  document.querySelectorAll('img').forEach(img => {
    if (!img.width || !img.height) {
      img.loading = 'lazy';
    }
  });

  // Improve First Input Delay
  document.addEventListener('DOMContentLoaded', () => {
    // Defer non-critical JavaScript
    setTimeout(() => {
      // Initialize analytics or other non-critical features
    }, 100);
  });
};

/**
 * Add performance monitoring
 */
export const monitorPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        console.log('Performance metrics:', {
          FCP: perfData.loadEventEnd - perfData.loadEventStart,
          LCP: perfData.loadEventEnd - perfData.fetchStart,
          TTFB: perfData.responseStart - perfData.requestStart
        });
      }, 0);
    });
  }
};