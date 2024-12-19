import type { Report } from '../../types/report';
import { downloadFile } from './file';

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