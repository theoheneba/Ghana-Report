import React from 'react';
import { Download, FileText, Table } from 'lucide-react';
import { Button } from '../ui/Button';
import { downloadAsCSV, downloadAsJSON, downloadAsPDF } from '../../utils/download';
import type { Report } from '../../types/report';

interface ReportDownloadProps {
  report: Report;
}

export function ReportDownload({ report }: ReportDownloadProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => downloadAsPDF(report)}
        className="flex items-center gap-2"
      >
        <FileText className="w-4 h-4" />
        PDF
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => downloadAsCSV(report)}
        className="flex items-center gap-2"
      >
        <Table className="w-4 h-4" />
        CSV
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => downloadAsJSON(report)}
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        JSON
      </Button>
    </div>
  );
}