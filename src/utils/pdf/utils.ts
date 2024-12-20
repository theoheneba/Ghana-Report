export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (error) => {
      console.error('Failed to load image:', url, error);
      reject(new Error(`Failed to load image: ${url}`));
    };
    img.src = url;
  });
}