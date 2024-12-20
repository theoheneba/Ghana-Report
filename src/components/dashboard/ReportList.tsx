import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ReportDetailsModal } from '../modals/ReportDetailsModal';
import { formatDate } from '../../utils/date';
import { FadeIn } from '../animations/FadeIn';
import type { Report } from '../../types/report';

interface ReportListProps {
  reports: Array<Report>;
  onUpdateStatus: (reportId: string, status: string) => Promise<void>;
}

const STATUS_OPTIONS = ['pending', 'investigating', 'resolved', 'dismissed'];

export function ReportList({ reports, onUpdateStatus }: ReportListProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <FadeIn>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['ID', 'Title', 'Category', 'Date', 'Status', 'Actions'].map((header) => (
                  <th 
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {report.report_id?.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {report.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge>{report.category}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(report.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={report.status}
                      onChange={(e) => onUpdateStatus(report.id!, e.target.value)}
                      className="text-sm border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white bg-white"
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReport(report)}
                      className="hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedReport && (
          <ReportDetailsModal
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
          />
        )}
      </Card>
    </FadeIn>
  );
}