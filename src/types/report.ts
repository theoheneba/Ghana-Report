export type ReportCategory = 
  | 'corruption'
  | 'fraud'
  | 'misconduct'
  | 'harassment'
  | 'discrimination'
  | 'environmental'
  | 'other';

export type ReportStatus =
  | 'pending'
  | 'investigating'
  | 'resolved'
  | 'dismissed';

export interface Report {
  id?: string;
  report_id?: string;
  title: string;
  category: ReportCategory;
  description: string;
  date: string;
  location: string;
  involved_parties?: string;
  willing_to_testify: boolean;
  files: File[];
  status?: ReportStatus;
  created_at?: string;
}