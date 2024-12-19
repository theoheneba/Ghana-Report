import React from 'react';
import { ReportStats } from '../components/dashboard/ReportStats';
import { ReportList } from '../components/dashboard/ReportList';
import { ReportFilters } from '../components/dashboard/ReportFilters';
import { AdminLayout } from '../components/layout/AdminLayout';
import { useReports } from '../hooks/useReports';
import { useReportFilters } from '../hooks/useReportFilters';

export function Dashboard() {
  const { reports, isLoading, error, updateReportStatus } = useReports();
  const { filters, filteredReports, handleFilterChange, handleClearFilters } = useReportFilters(reports);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
          <p className="text-gray-600">Monitor and manage submitted reports</p>
        </div>

        <ReportFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <ReportStats reports={filteredReports} />
        <ReportList 
          reports={filteredReports} 
          onUpdateStatus={updateReportStatus}
        />
      </div>
    </AdminLayout>
  );
}