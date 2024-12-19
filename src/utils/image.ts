export async function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.crossOrigin = 'anonymous';
    img.src = src;
  });
}

export function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>): void {
  console.error('Image failed to load');
  event.currentTarget.style.display = 'none';
}