import { useState, useEffect } from 'react';
import { preloadImage } from '../utils/image';

export function useImagePreload(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    preloadImage(src)
      .then(() => setIsLoaded(true))
      .catch((err) => setError(err));
  }, [src]);

  return { isLoaded, error };
}