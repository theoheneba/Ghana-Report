import React from 'react';
import { X } from 'lucide-react';
import { formatDate } from '../../utils/date';
import { Badge } from '../ui/Badge';
import { FadeIn } from '../animations/FadeIn';
import type { Report } from '../../types/report';

interface ReportDetailsModalProps {
  report: Report;
  onClose: () => void;
}

export function ReportDetailsModal({ report, onClose }: ReportDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <FadeIn>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Report Details
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ID: {report.report_id}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge variant={report.status === 'resolved' ? 'green' : 'default'}>
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
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}