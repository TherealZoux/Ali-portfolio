export const optimizeImage = (src, options = {}) => {
  const {
    width = 800,
    quality = 85,
    format = 'webp'
  } = options;

  if (src.startsWith('http') || src.startsWith('https')) {
    return src;
  }

  const imagePath = src.startsWith('/') ? src.slice(1) : src;
  
  if (import.meta.env.PROD) {
    return `/${imagePath}`;
  }

  return src;
};

export const preloadImage = (src, options = {}) => {
  const imageUrl = optimizeImage(src, options);
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = imageUrl;
  document.head.appendChild(link);
};
