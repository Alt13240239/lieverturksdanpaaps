
/**
 * Utility functions for language-specific styling and behaviors
 */

/**
 * Returns a class name based on the current language
 * This can be used to adjust font sizes or other styling based on language
 * 
 * @param language - Current language code
 * @param baseClass - Base class name
 * @returns Class name with language-specific adjustments
 */
export const getLanguageClass = (language: string, baseClass: string): string => {
  // Add specific adjustments for languages that may need different styling
  switch (language) {
    case 'nl':
      // Dutch words can be longer, so we might want to adjust some sizing for specific elements
      return baseClass;
    default:
      return baseClass;
  }
};
