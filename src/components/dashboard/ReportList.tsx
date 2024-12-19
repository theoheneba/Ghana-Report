import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ReportDetailsModal } from '../modals/ReportDetailsModal';
import { formatDate } from '../../utils/date';
import { toast } from 'react-hot-toast';
import { FadeIn } from '../animations/FadeIn';

interface ReportListProps {
  reports: Array<{
    id: string;
    report_id: string;
    title: string;
    category: string;
    date: string;
    status: string;
    description: string;
    location: string;
    involved_parties?: string;
    willing_to_testify: boolean;
    created_at: string;
  }>;
  onUpdateStatus: (reportId: string, status: string) => Promise<void>;
}

const STATUS_OPTIONS = ['pending', 'investigating', 'resolved', 'dismissed'];

export function ReportList({ reports, onUpdateStatus }: ReportListProps) {
  const [selectedReport, setSelectedReport] = useState<null | typeof reports[0]>(null);

  const handleStatusUpdate = async (reportId: string, newStatus: string) => {
    try {
      await onUpdateStatus(reportId, newStatus);
      toast.success('Report status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <FadeIn>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Reports List
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total: {reports.length} reports
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {report.report_id.slice(0, 8)}
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
                      onChange={(e) => handleStatusUpdate(report.id, e.target.value)}
                      className="text-sm border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
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
                      className="button-hover"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedReport && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </FadeIn>
  );
}