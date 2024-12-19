import { jsPDF } from 'jspdf';
import type { Report } from '../../types/report';
import { formatReportData } from './types';
import { colors } from '../../theme/colors';

const GHANA_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/5/59/Coat_of_arms_of_Ghana.svg';
const GHANA_FLAG_COLORS = {
  red: '#CE1126',
  yellow: '#FFD700',
  green: '#006B3F'
};

export async function downloadAsPDF(report: Report): Promise<void> {
  const data = formatReportData(report);
  const doc = new jsPDF();
  
  // Add Ghana flag colors stripe
  doc.setFillColor(GHANA_FLAG_COLORS.red);
  doc.rect(0, 0, 210, 4, 'F');
  doc.setFillColor(GHANA_FLAG_COLORS.yellow);
  doc.rect(0, 4, 210, 4, 'F');
  doc.setFillColor(GHANA_FLAG_COLORS.green);
  doc.rect(0, 8, 210, 4, 'F');

  // Add Ghana logo
  try {
    const img = await loadImage(GHANA_LOGO);
    doc.addImage(img, 'PNG', 85, 20, 40, 40);
  } catch (error) {
    console.error('Failed to load logo:', error);
  }

  // Add title and subtitle
  doc.setFontSize(24);
  doc.setTextColor(colors.text.light);
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

  // Title section
  addSection(doc, 'Title', data.title, y);
  y += 40;

  // Location and date
  addSection(doc, 'Location & Date', [
    `Location: ${data.location}`,
    `Date: ${new Date(data.date).toLocaleDateString()}`
  ], y);
  y += 40;

  // Description section
  addSection(doc, 'Description', data.description, y);

  // Add footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFillColor(245, 245, 245);
  doc.rect(0, pageHeight - 20, 210, 20, 'F');
  
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('This is an official document from the Ghana Report system.', 105, pageHeight - 12, { align: 'center' });
  doc.text('Please handle with confidentiality.', 105, pageHeight - 6, { align: 'center' });

  // Save the PDF
  doc.save(`ghana-report-${data.report_id}.pdf`);
}

function addSection(doc: jsPDF, title: string, content: string | string[], y: number): void {
  // Add section marker
  doc.setFillColor(GHANA_FLAG_COLORS.yellow);
  doc.rect(20, y, 3, 10, 'F');
  
  // Add title
  doc.setFontSize(16);
  doc.setTextColor(colors.text.light);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 30, y + 8);
  
  // Add content
  y += 20;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  if (Array.isArray(content)) {
    content.forEach((line, index) => {
      doc.text(line, 30, y + (index * 10));
    });
  } else {
    const lines = doc.splitTextToSize(content, 150);
    doc.text(lines, 30, y);
  }
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}