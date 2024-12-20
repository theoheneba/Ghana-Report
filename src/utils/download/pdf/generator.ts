import { jsPDF } from 'jspdf';
import type { Report } from '../../../types/report';
import { formatReportData } from '../types';
import { ASSETS } from '../../../constants/assets';
import { loadImage } from './utils';

export async function generateReportPDF(report: Report): Promise<void> {
  const data = formatReportData(report);
  const doc = new jsPDF();
  
  // Add Ghana flag colors stripe at top
  doc.setFillColor(ASSETS.GHANA_FLAG_COLORS.red);
  doc.rect(0, 0, 210, 4, 'F');
  doc.setFillColor(ASSETS.GHANA_FLAG_COLORS.yellow);
  doc.rect(0, 4, 210, 4, 'F');
  doc.setFillColor(ASSETS.GHANA_FLAG_COLORS.green);
  doc.rect(0, 8, 210, 4, 'F');

  // Add Ghana logo
  try {
    const img = await loadImage(ASSETS.GHANA_COAT_OF_ARMS);
    doc.addImage(img, 'PNG', 85, 20, 40, 40);
  } catch (error) {
    console.error('Failed to load logo:', error);
  }

  // Add title and metadata
  doc.setFontSize(24);
  doc.setTextColor(0);
  doc.text('GHANA REPORT', 105, 80, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text('Report Details', 105, 90, { align: 'center' });

  // Add metadata
  let y = 110;
  const metadata = [
    ['Report ID:', data.report_id],
    ['Status:', data.status.toUpperCase()],
    ['Category:', data.category],
    ['Date:', new Date(data.date).toLocaleDateString()],
    ['Location:', data.location]
  ];

  metadata.forEach(([label, value]) => {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(label, 30, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 80, y);
    y += 10;
  });

  // Add description
  y += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Description', 30, y);
  y += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const lines = doc.splitTextToSize(data.description, 150);
  doc.text(lines, 30, y);

  // Add footer with Ghana colors
  const pageHeight = doc.internal.pageSize.height;
  doc.setFillColor(ASSETS.GHANA_FLAG_COLORS.red);
  doc.rect(0, pageHeight - 12, 210, 4, 'F');
  doc.setFillColor(ASSETS.GHANA_FLAG_COLORS.yellow);
  doc.rect(0, pageHeight - 8, 210, 4, 'F');
  doc.setFillColor(ASSETS.GHANA_FLAG_COLORS.green);
  doc.rect(0, pageHeight - 4, 210, 4, 'F');

  // Save the PDF
  doc.save(`ghana-report-${data.report_id}.pdf`);
}