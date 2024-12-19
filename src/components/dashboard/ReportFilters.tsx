import React from 'react';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { REPORT_CATEGORIES, REPORT_STATUSES } from '../../constants/reports';
import { ResponsiveGrid } from '../ui/ResponsiveGrid';

interface ReportFiltersProps {
  filters: {
    search: string;
    category: string;
    status: string;
    dateFrom: string;
    dateTo: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export function ReportFilters({ filters, onFilterChange, onClearFilters }: ReportFiltersProps) {
  return (
    <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Input
          type="text"
          placeholder="Search reports..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="w-full"
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {REPORT_CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            {REPORT_STATUSES.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="From"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange('dateFrom', e.target.value)}
            className="w-full"
          />
          <Input
            type="date"
            label="To"
            value={filters.dateTo}
            onChange={(e) => onFilterChange('dateTo', e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}