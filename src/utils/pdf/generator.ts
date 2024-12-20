import { jsPDF } from 'jspdf';
import type { Report } from '../../types/report';
import { addHeader, addMetadataBox, addSection, addFooter, addGhanaLogo } from './components';
import { formatDate } from '../date';

export async function generatePDF(report: Report): Promise<void> {
  const doc = new jsPDF();
  
  // Add header with Ghana flag colors and title
  addHeader(doc);
  
  // Add Ghana Coat of Arms
  await addGhanaLogo(doc, 85, 15, 40);
  
  // Add metadata box
  const metadata: [string, string][] = [
    ['Report ID:', report.report_id || ''],
    ['Status:', report.status?.toUpperCase() || 'PENDING'],
    ['Category:', report.category.toUpperCase()],
    ['Generated:', formatDate(new Date().toISOString())]
  ];
  
  let y = addMetadataBox(doc, metadata, 80);
  
  // Add content sections
  y = addSection(doc, 'Title', report.title, y + 20);
  
  y = addSection(doc, 'Location & Date', [
    `Location: ${report.location}`,
    `Date: ${formatDate(report.date)}`
  ].join('\n'), y + 20);
  
  y = addSection(doc, 'Description', report.description, y + 20);
  
  if (report.involved_parties) {
    y = addSection(doc, 'Involved Parties', report.involved_parties, y + 20);
  }
  
  // Add footer
  addFooter(doc);
  
  // Save the PDF
  doc.save(`ghana-report-${report.report_id}.pdf`);
}