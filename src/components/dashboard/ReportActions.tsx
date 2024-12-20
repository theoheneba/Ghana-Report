import React from 'react';
import { Download, FileText, Table, MessageSquare, History } from 'lucide-react';
import { Button } from '../ui/Button';
import { downloadAsPDF } from '../../utils/download/pdf';
import { downloadAsCSV } from '../../utils/download/csv';
import { downloadAsJSON } from '../../utils/download/json';
import type { Report } from '../../types/report';

interface ReportActionsProps {
  report: Report;
  onShowComments: () => void;
  onShowActivity: () => void;
}

export function ReportActions({ report, onShowComments, onShowActivity }: ReportActionsProps) {
  const handlePDFDownload = async () => {
    try {
      await downloadAsPDF(report);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4 border-t pt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePDFDownload}
        className="flex items-center gap-2"
      >
        <FileText className="w-4 h-4" />
        Download PDF
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => downloadAsCSV(report)}
        className="flex items-center gap-2"
      >
        <Table className="w-4 h-4" />
        Download CSV
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => downloadAsJSON(report)}
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Download JSON
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onShowComments}
        className="flex items-center gap-2"
      >
        <MessageSquare className="w-4 h-4" />
        Comments
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onShowActivity}
        className="flex items-center gap-2"
      >
        <History className="w-4 h-4" />
        Activity
      </Button>
    </div>
  );
}