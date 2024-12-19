import type { Report } from '../../types/report';
import { downloadFile } from './file';

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