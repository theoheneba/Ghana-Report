export const REPORT_CATEGORIES = [
  'corruption',
  'fraud',
  'misconduct',
  'harassment',
  'discrimination',
  'environmental',
  'other'
] as const;

export const REPORT_STATUSES = [
  'pending',
  'investigating',
  'resolved',
  'dismissed'
] as const;

export type ReportCategory = typeof REPORT_CATEGORIES[number];
export type ReportStatus = typeof REPORT_STATUSES[number];