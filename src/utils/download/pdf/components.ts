import { jsPDF } from 'jspdf';

const GHANA_FLAG_COLORS = {
  red: '#CE1126',
  yellow: '#FFD700',
  green: '#006B3F'
};

export function addHeader(doc: jsPDF): void {
  // Add Ghana flag colors stripe
  doc.setFillColor(GHANA_FLAG_COLORS.red);
  doc.rect(0, 0, 210, 4, 'F');
  doc.setFillColor(GHANA_FLAG_COLORS.yellow);
  doc.rect(0, 4, 210, 4, 'F');
  doc.setFillColor(GHANA_FLAG_COLORS.green);
  doc.rect(0, 8, 210, 4, 'F');
}

export function addFooter(doc: jsPDF): void {
  const pageHeight = doc.internal.pageSize.height;
  
  // Add background
  doc.setFillColor(245, 245, 245);
  doc.rect(0, pageHeight - 20, 210, 20, 'F');
  
  // Add text
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('This is an official document from the Ghana Report system.', 105, pageHeight - 12, { align: 'center' });
  doc.text('Please handle with confidentiality.', 105, pageHeight - 6, { align: 'center' });
}

export function addSection(doc: jsPDF, title: string, content: string | string[], y: number): number {
  // Add section marker
  doc.setFillColor(GHANA_FLAG_COLORS.yellow);
  doc.rect(20, y, 3, 10, 'F');
  
  // Add title
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
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
    y += content.length * 10;
  } else {
    const lines = doc.splitTextToSize(content, 150);
    doc.text(lines, 30, y);
    y += lines.length * 10;
  }

  return y;
}

export function addMetadataBox(doc: jsPDF, metadata: [string, string][], y: number): number {
  const boxHeight = metadata.length * 10 + 14;
  
  // Add background
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(20, y, 170, boxHeight, 3, 3, 'F');
  
  // Add metadata
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  
  metadata.forEach(([label, value], index) => {
    const lineY = y + 12 + (index * 10);
    doc.setFont('helvetica', 'bold');
    doc.text(label, 30, lineY);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 80, lineY);
  });

  return y + boxHeight;
}