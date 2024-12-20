import { jsPDF } from 'jspdf';
import type { Report } from '../../types/report';
import { formatDate } from '../date';

export async function downloadAsPDF(report: Report): Promise<void> {
  // Create new document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Add Ghana flag colors at top
  addStripe(doc, 0);
  
  // Title
  doc.setFontSize(24);
  doc.setTextColor(0);
  doc.text('GHANA REPORT', pageWidth / 2, 40, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text('Official Report Document', pageWidth / 2, 50, { align: 'center' });

  // Metadata box
  const metadata = [
    ['Report ID:', report.report_id || ''],
    ['Status:', (report.status || 'PENDING').toUpperCase()],
    ['Category:', report.category.toUpperCase()],
    ['Generated:', formatDate(new Date().toISOString())]
  ];

  let y = 70;
  y = addMetadataBox(doc, metadata, y);

  // Content sections
  y = addSection(doc, 'Title', report.title, y + 10);
  y = addSection(doc, 'Location & Date', `Location: ${report.location}\nDate: ${formatDate(report.date)}`, y + 10);
  y = addSection(doc, 'Description', report.description, y + 10);

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  addStripe(doc, pageHeight - 15);
  
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text('This is an official document from the Ghana Report system.', pageWidth / 2, pageHeight - 25, { align: 'center' });
  doc.text('Please handle with confidentiality.', pageWidth / 2, pageHeight - 20, { align: 'center' });

  // Save PDF
  doc.save(`ghana-report-${report.report_id}.pdf`);
}

function addStripe(doc: jsPDF, y: number) {
  const width = doc.internal.pageSize.width;
  
  // Red stripe
  doc.setFillColor(206, 17, 38);
  doc.rect(0, y, width, 4, 'F');
  
  // Yellow stripe with star
  doc.setFillColor(255, 215, 0);
  doc.rect(0, y + 4, width, 4, 'F');
  
  // Black star
  doc.setFillColor(0);
  const starPoints = [
    [width/2, y + 4.8],
    [width/2 + 1.5, y + 7.2],
    [width/2 - 1.5, y + 7.2]
  ];
  doc.triangle(
    starPoints[0][0], starPoints[0][1],
    starPoints[1][0], starPoints[1][1],
    starPoints[2][0], starPoints[2][1],
    'F'
  );
  
  // Green stripe
  doc.setFillColor(0, 107, 63);
  doc.rect(0, y + 8, width, 4, 'F');
}

function addMetadataBox(doc: jsPDF, metadata: [string, string][], y: number): number {
  const padding = 10;
  const lineHeight = 7;
  
  // Background
  doc.setFillColor(245, 245, 245);
  doc.rect(20, y, doc.internal.pageSize.width - 40, metadata.length * lineHeight + padding * 2, 'F');
  
  // Content
  doc.setFontSize(10);
  metadata.forEach(([label, value], index) => {
    const yPos = y + padding + (index * lineHeight);
    doc.setFont('helvetica', 'bold');
    doc.text(label, 30, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 100, yPos);
  });
  
  return y + (metadata.length * lineHeight) + (padding * 2);
}

function addSection(doc: jsPDF, title: string, content: string, y: number): number {
  // Yellow marker
  doc.setFillColor(255, 215, 0);
  doc.rect(20, y, 3, 8, 'F');
  
  // Title
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 30, y + 6);
  
  // Content
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const lines = doc.splitTextToSize(content, 160);
  doc.text(lines, 30, y + 15);
  
  return y + 20 + (lines.length * 5);
}