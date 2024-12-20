import { toast } from 'react-hot-toast';

export function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>, fallback?: () => void): void {
  const img = event.currentTarget;
  console.error('Image failed to load:', img.src);
  
  if (fallback) {
    fallback();
  } else {
    img.style.display = 'none';
    toast.error('Failed to load image');
  }
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => {
      console.error('Failed to preload image:', src);
      reject(new Error(`Failed to load image: ${src}`));
    };
    img.src = src;
  });
}