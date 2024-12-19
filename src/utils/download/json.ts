import type { Report } from '../../types/report';
import { formatReportData } from './types';
import { downloadFile } from './core';

export function downloadAsJSON(report: Report): void {
  const data = formatReportData(report);
  const jsonContent = JSON.stringify(data, null, 2);

  downloadFile({
    filename: `report-${data.report_id}.json`,
    type: 'application/json',
    content: jsonContent
  });
}