import { jsPDF } from 'jspdf';
import type { Report } from '../../../types/report';
import { formatReportData } from '../types';
import { ASSETS } from '../../../constants/assets';

async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export async function downloadAsPDF(report: Report): Promise<void> {
  const data = formatReportData(report);
  const doc = new jsPDF();
  
  // Add Ghana flag colors stripe
  doc.setFillColor(ASSETS.GHANA_FLAG_COLORS.red);
  doc.rect(0, 0, 210, 4, 'F');
  doc.setFillColor(ASSETS.GHANA_FLAG_COLORS.yellow);
  doc.rect(0, 4, 210, 4, 'F');
  doc.setFillColor(ASSETS.GHANA_FLAG_COLORS.green);
  doc.rect(0, 8, 210, 4, 'F');

  // Add Ghana Coat of Arms
  try {
    const img = await loadImage(ASSETS.GHANA_COAT_OF_ARMS);
    doc.addImage(img, 'PNG', 85, 20, 40, 40);
  } catch (error) {
    console.error('Failed to load Ghana Coat of Arms:', error);
  }

  // Add title and subtitle
  doc.setFontSize(24);
  doc.setTextColor(0);
  doc.setFont('helvetica', 'bold');
  doc.text('GHANA REPORT', 105, 75, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Official Report Document', 105, 85, { align: 'center' });

  // Add metadata box
  const metadataY = 100;
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(20, metadataY, 170, 45, 3, 3, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  
  const metadata = [
    ['Report ID:', data.report_id],
    ['Status:', data.status.toUpperCase()],
    ['Category:', data.category.toUpperCase()],
    ['Generated:', new Date().toLocaleDateString()]
  ];

  metadata.forEach(([label, value], index) => {
    const y = metadataY + 12 + (index * 10);
    doc.setFont('helvetica', 'bold');
    doc.text(label, 30, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 80, y);
  });

  // Add main content sections
  let y = 160;

  // Add sections with Ghana-themed styling
  const addSection = (title: string, content: string | string[], yPos: number) => {
    // Add section marker in Ghana yellow
    doc.setFillColor(ASSETS.GHANA_FLAG_COLORS.yellow);
    doc.rect(20, yPos, 3, 10, 'F');
    
    // Add title
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 30, yPos + 8);
    
    // Add content
    yPos += 20;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    if (Array.isArray(content)) {
      content.forEach((line, index) => {
        doc.text(line, 30, yPos + (index * 10));
      });
      return yPos + content.length * 10;
    } else {
      const lines = doc.splitTextToSize(content, 150);
      doc.text(lines, 30, yPos);
      return yPos + lines.length * 10;
    }
  };

  y = addSection('Title', data.title, y);
  y = addSection('Location & Date', [
    `Location: ${data.location}`,
    `Date: ${new Date(data.date).toLocaleDateString()}`
  ], y + 10);
  y = addSection('Description', data.description, y + 10);

  // Add footer with Ghana colors
  const pageHeight = doc.internal.pageSize.height;
  doc.setFillColor(245, 245, 245);
  doc.rect(0, pageHeight - 20, 210, 20, 'F');
  
  // Add Ghana flag colors to footer
  doc.setFillColor(ASSETS.GHANA_FLAG_COLORS.red);
  doc.rect(0, pageHeight - 3, 210, 1, 'F');
  doc.setFillColor(ASSETS.GHANA_FLAG_COLORS.yellow);
  doc.rect(0, pageHeight - 2, 210, 1, 'F');
  doc.setFillColor(ASSETS.GHANA_FLAG_COLORS.green);
  doc.rect(0, pageHeight - 1, 210, 1, 'F');
  
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('This is an official document from the Ghana Report system.', 105, pageHeight - 12, { align: 'center' });
  doc.text('Please handle with confidentiality.', 105, pageHeight - 6, { align: 'center' });

  // Save the PDF
  doc.save(`ghana-report-${data.report_id}.pdf`);
}