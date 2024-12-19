import { jsPDF } from 'jspdf';
import type { Report } from '../types/report';

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
    doc.setFont(undefined, 'bold');
    doc.text(`${label}:`, 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(value, 80, y);
    y += 10;
  });
  
  // Add title
  y += 10;
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Title', 20, y);
  y += 8;
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text(report.title, 20, y);
  
  // Add description
  y += 15;
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Description', 20, y);
  y += 8;
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  const description = doc.splitTextToSize(report.description, 170);
  doc.text(description, 20, y);
  
  // Save the PDF
  doc.save(`report-${report.report_id}.pdf`);
}

export function downloadAsCSV(report: Report) {
  const rows = [
    ['Field', 'Value'],
    ['Report ID', report.report_id || ''],
    ['Title', report.title],
    ['Category', report.category],
    ['Status', report.status || 'Pending'],
    ['Date', new Date(report.date).toLocaleDateString()],
    ['Location', report.location],
    ['Description', report.description],
    ['Submitted', new Date(report.created_at || '').toLocaleDateString()]
  ];

  const csvContent = rows
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  downloadFile(
    `report-${report.report_id}.csv`,
    'text/csv',
    csvContent
  );
}

export function downloadAsJSON(report: Report) {
  const data = {
    report_id: report.report_id,
    title: report.title,
    category: report.category,
    status: report.status || 'Pending',
    date: report.date,
    location: report.location,
    description: report.description,
    created_at: report.created_at,
  };

  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(
    `report-${report.report_id}.json`,
    'application/json',
    jsonContent
  );
}

function downloadFile(filename: string, type: string, content: string) {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}