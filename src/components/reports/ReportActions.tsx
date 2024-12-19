import React from 'react';
import { Printer, FileDown, MessageSquare, History } from 'lucide-react';
import { Button } from '../ui/Button';
import { generatePDF } from '../../utils/pdf';
import { printReport } from '../../utils/print';
import type { Report } from '../../types/report';

interface ReportActionsProps {
  report: Report;
  onShowComments: () => void;
  onShowActivity: () => void;
}

export function ReportActions({ report, onShowComments, onShowActivity }: ReportActionsProps) {
  return (
    <div className="flex gap-2 mt-4 border-t pt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => printReport(report)}
        className="flex items-center gap-2"
      >
        <Printer className="w-4 h-4" />
        Print
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => generatePDF(report)}
        className="flex items-center gap-2"
      >
        <FileDown className="w-4 h-4" />
        Export PDF
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