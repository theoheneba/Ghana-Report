import React from 'react';
import { Download, FileText, Table } from 'lucide-react';
import { Button } from '../ui/Button';
import { downloadAsPDF } from '../../utils/download/pdf';
import { downloadAsCSV } from '../../utils/download/csv';
import { downloadAsJSON } from '../../utils/download/json';
import type { Report } from '../../types/report';

interface ReportDownloadProps {
  report: Report;
}

export function ReportDownload({ report }: ReportDownloadProps) {
  const handlePDFDownload = async () => {
    try {
      await downloadAsPDF(report);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
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
    </div>
  );
}