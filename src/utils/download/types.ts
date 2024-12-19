import type { Report } from '../../types/report';

export interface DownloadOptions {
  filename: string;
  type: string;
  content: string | Blob;
}

export interface ReportDownloadData {
  report_id: string;
  title: string;
  category: string;
  status: string;
  date: string;
  location: string;
  description: string;
  created_at?: string;
}

export function formatReportData(report: Report): ReportDownloadData {
  return {
    report_id: report.report_id || '',
    title: report.title,
    category: report.category,
    status: report.status || 'pending',
    date: report.date,
    location: report.location,
    description: report.description,
    created_at: report.created_at
  };
}