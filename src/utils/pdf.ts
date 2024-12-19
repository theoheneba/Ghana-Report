import { jsPDF } from 'jspdf';
import type { Report } from '../types/report';

export function generatePDF(report: Report) {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.text('Report Details', 20, 20);
  
  // Add report ID
  doc.setFontSize(12);
  doc.text(`Report ID: ${report.report_id}`, 20, 30);
  
  // Add status and date
  doc.text(`Status: ${report.status}`, 20, 40);
  doc.text(`Date: ${new Date(report.date).toLocaleDateString()}`, 20, 50);
  
  // Add title and description
  doc.setFontSize(16);
  doc.text('Title', 20, 70);
  doc.setFontSize(12);
  doc.text(report.title, 20, 80);
  
  doc.setFontSize(16);
  doc.text('Description', 20, 100);
  doc.setFontSize(12);
  const description = doc.splitTextToSize(report.description, 170);
  doc.text(description, 20, 110);
  
  // Save the PDF
  doc.save(`report-${report.report_id}.pdf`);
}