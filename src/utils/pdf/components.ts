import { jsPDF } from 'jspdf';
import { ASSETS } from '../../constants/assets';
import { loadImage } from './utils';

export async function addGhanaLogo(doc: jsPDF, x: number, y: number, size: number): Promise<void> {
  try {
    const img = await loadImage(ASSETS.GHANA_COAT_OF_ARMS);
    doc.addImage(img, 'PNG', x, y, size, size);
  } catch (error) {
    console.error('Failed to add Ghana logo to PDF:', error);
  }
}

// ... rest of the file stays the same ...