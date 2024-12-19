import React, { useState } from 'react';
import { Search, AlertCircle, FileText, Calendar, MapPin, Clock } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { ReportDownload } from './reports/ReportDownload';
import { useReportLookup } from '../hooks/useReportLookup';
import { formatDate } from '../utils/date';

export function ReportLookup() {
  const [reportId, setReportId] = useState('');
  const { lookupReport, report, isLoading, error } = useReportLookup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reportId.trim()) {
      await lookupReport(reportId.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Report ID"
              placeholder="Enter the ID provided when you submitted your report"
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
              icon={<FileText className="w-5 h-5 text-gray-400" />}
              className="w-full text-lg py-6 px-4"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !reportId.trim()}
              className="w-full py-3"
            >
              {isLoading ? (
                'Searching...'
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Look Up Report
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {report && (
            <div className="space-y-6 animate-fadeIn pt-4 border-t dark:border-gray-700">
              <div className="flex items-center justify-between pb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {report.title}
                </h3>
                <Badge variant={getStatusVariant(report.status)}>
                  {report.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                    <p className="text-gray-900 dark:text-white">{formatDate(report.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-gray-900 dark:text-white">{report.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</p>
                    <p className="text-gray-900 dark:text-white capitalize">{report.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Submitted</p>
                    <p className="text-gray-900 dark:text-white">{formatDate(report.created_at)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Description</h4>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  {report.description}
                </p>
              </div>

              <div className="border-t dark:border-gray-700 pt-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Download Report</h4>
                <ReportDownload report={report} />
              </div>
            </div>
          )}
        </form>
      </Card>
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