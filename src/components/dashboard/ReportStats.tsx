import React from 'react';
import { ReportCharts } from './ReportCharts';
import { StatsCard } from './StatsCard';
import { AlertTriangle, FileCheck, Clock, Ban } from 'lucide-react';
import type { Report } from '../../types/report';

interface ReportStatsProps {
  reports: Report[];
}

export function ReportStats({ reports }: ReportStatsProps) {
  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
    dismissed: reports.filter(r => r.status === 'dismissed').length
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Reports"
          value={stats.total}
          icon={<AlertTriangle className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
          change={12}
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          icon={<Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />}
          change={-5}
        />
        <StatsCard
          title="Resolved"
          value={stats.resolved}
          icon={<FileCheck className="h-6 w-6 text-green-600 dark:text-green-400" />}
          change={8}
        />
        <StatsCard
          title="Dismissed"
          value={stats.dismissed}
          icon={<Ban className="h-6 w-6 text-red-600 dark:text-red-400" />}
          change={-2}
        />
      </div>

      <ReportCharts reports={reports} />
    </div>
  );
}