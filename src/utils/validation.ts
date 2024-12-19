import type { Report } from '../types/report';

export function validateReport(report: Partial<Report>): string[] {
  const errors: string[] = [];

  if (!report.title?.trim()) {
    errors.push('Title is required');
  }

  if (!report.description?.trim()) {
    errors.push('Description is required');
  }

  if (!report.date) {
    errors.push('Date is required');
  }

  if (!report.location?.trim()) {
    errors.push('Location is required');
  }

  return errors;
}