import type { Report } from '../types/report';

export function printReport(report: Report) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Report ${report.report_id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { margin-bottom: 20px; }
          .section { margin-bottom: 15px; }
          .label { font-weight: bold; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Report Details</h1>
          <p>ID: ${report.report_id}</p>
        </div>
        
        <div class="section">
          <div class="label">Status:</div>
          <div>${report.status}</div>
        </div>
        
        <div class="section">
          <div class="label">Date:</div>
          <div>${new Date(report.date).toLocaleDateString()}</div>
        </div>
        
        <div class="section">
          <div class="label">Title:</div>
          <div>${report.title}</div>
        </div>
        
        <div class="section">
          <div class="label">Description:</div>
          <div>${report.description}</div>
        </div>
        
        <button class="no-print" onclick="window.print()">Print Report</button>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}