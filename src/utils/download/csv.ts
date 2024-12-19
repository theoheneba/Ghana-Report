import type { Report } from '../../types/report';
import { formatReportData } from './types';
import { downloadFile } from './core';

export function downloadAsCSV(report: Report): void {
  const data = formatReportData(report);
  const rows = [
    ['Field', 'Value'],
    ['Report ID', data.report_id],
    ['Title', data.title],
    ['Category', data.category],
    ['Status', data.status],
    ['Date', new Date(data.date).toLocaleDateString()],
    ['Location', data.location],
    ['Description', data.description],
    ['Submitted', data.created_at ? new Date(data.created_at).toLocaleDateString() : '']
  ];

  const csvContent = rows
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  downloadFile({
    filename: `report-${data.report_id}.csv`,
    type: 'text/csv',
    content: csvContent
  });
}