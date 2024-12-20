import React from 'react';
import { X } from 'lucide-react';
import { formatDate } from '../../utils/date';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ReportActions } from '../dashboard/ReportActions';
import { ActivityLog } from '../reports/ActivityLog';
import { CommentSection } from '../reports/CommentSection';
import { FadeIn } from '../animations/FadeIn';
import type { Report } from '../../types/report';

interface ReportDetailsModalProps {
  report: Report;
  onClose: () => void;
  showComments?: boolean;
  showActivity?: boolean;
  onToggleComments?: () => void;
  onToggleActivity?: () => void;
}

export function ReportDetailsModal({ 
  report, 
  onClose,
  showComments = false,
  showActivity = false,
  onToggleComments,
  onToggleActivity
}: ReportDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <FadeIn>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-start z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Report Details
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ID: {report.report_id}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-2">
              <Badge variant={getStatusVariant(report.status)}>
                {report.status}
              </Badge>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(report.date)}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {report.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {report.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-200">Category</h4>
                <p className="text-gray-600 dark:text-gray-300">{report.category}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-200">Location</h4>
                <p className="text-gray-600 dark:text-gray-300">{report.location}</p>
              </div>
            </div>

            {report.involved_parties && (
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-200">
                  Involved Parties
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {report.involved_parties}
                </p>
              </div>
            )}

            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-200">
                Additional Information
              </h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>
                  Willing to testify: {report.willing_to_testify ? 'Yes' : 'No'}
                </li>
                <li>
                  Submitted on: {formatDate(report.created_at)}
                </li>
              </ul>
            </div>

            <ReportActions
              report={report}
              onShowComments={onToggleComments}
              onShowActivity={onToggleActivity}
            />

            {showComments && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <CommentSection reportId={report.id} />
              </div>
            )}

            {showActivity && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <ActivityLog reportId={report.id} />
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'pending':
      return 'yellow';
    case 'investigating':
      return 'default';
    case 'resolved':
      return 'green';
    case 'dismissed':
      return 'red';
    default:
      return 'default';
  }
}