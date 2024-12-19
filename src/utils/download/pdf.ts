import { jsPDF } from 'jspdf';
import type { Report } from '../../types/report';

export function downloadAsPDF(report: Report) {
  const doc = new jsPDF();
  
  // Add header with logo
  doc.setFontSize(24);
  doc.setTextColor(59, 130, 246); // Blue
  doc.text('Report Details', 20, 30);
  
  // Add report ID and metadata
  doc.setFontSize(12);
  doc.setTextColor(0);
  
  const metadata = [
    ['Report ID', report.report_id || ''],
    ['Status', report.status || 'Pending'],
    ['Category', report.category],
    ['Date', new Date(report.date).toLocaleDateString()],
    ['Location', report.location],
    ['Submitted', new Date(report.created_at || '').toLocaleDateString()]
  ];

  let y = 50;
  metadata.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(String(value), 80, y);
    y += 10;
  });
  
  // Add title
  y += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Title', 20, y);
  y += 8;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(report.title, 20, y);
  
  // Add description
  y += 15;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Description', 20, y);
  y += 8;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const description = doc.splitTextToSize(report.description, 170);
  doc.text(description, 20, y);
  
  // Save the PDF
  doc.save(`report-${report.report_id}.pdf`);
}