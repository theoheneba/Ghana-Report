import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card } from '../ui/Card';
import { ASSETS } from '../../constants/assets';
import type { Report } from '../../types/report';

interface ReportChartsProps {
  reports: Report[];
}

export function ReportCharts({ reports }: ReportChartsProps) {
  const categoryData = getCategoryData(reports);
  const statusData = getStatusData(reports);
  const timelineData = getTimelineData(reports);

  const COLORS = [
    ASSETS.GHANA_FLAG_COLORS.red,
    ASSETS.GHANA_FLAG_COLORS.yellow,
    ASSETS.GHANA_FLAG_COLORS.green,
    '#2563eb',
    '#7c3aed',
    '#db2777'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Reports by Category</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={ASSETS.GHANA_FLAG_COLORS.yellow} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function getCategoryData(reports: Report[]) {
  const counts = reports.reduce((acc, report) => {
    acc[report.category] = (acc[report.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).map(([name, value]) => ({
    name,
    value
  }));
}

function getStatusData(reports: Report[]) {
  const counts = reports.reduce((acc, report) => {
    acc[report.status || 'pending'] = (acc[report.status || 'pending'] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).map(([name, value]) => ({
    name,
    value
  }));
}

function getTimelineData(reports: Report[]) {
  const timeline = reports.reduce((acc, report) => {
    const date = new Date(report.created_at || '').toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(timeline).map(([date, count]) => ({
    date,
    count
  }));
}