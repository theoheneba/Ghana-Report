import { useState, useCallback, useMemo } from 'react';
import type { Report } from '../types/report';

interface Filters {
  search: string;
  category: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

const initialFilters: Filters = {
  search: '',
  category: '',
  status: '',
  dateFrom: '',
  dateTo: ''
};

export function useReportFilters(reports: Report[]) {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleFilterChange = useCallback((key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = !filters.search || 
        report.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        report.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = !filters.category || report.category === filters.category;
      const matchesStatus = !filters.status || report.status === filters.status;

      const reportDate = new Date(report.date);
      const matchesDateFrom = !filters.dateFrom || reportDate >= new Date(filters.dateFrom);
      const matchesDateTo = !filters.dateTo || reportDate <= new Date(filters.dateTo);

      return matchesSearch && matchesCategory && matchesStatus && matchesDateFrom && matchesDateTo;
    });
  }, [reports, filters]);

  return {
    filters,
    filteredReports,
    handleFilterChange,
    handleClearFilters
  };
}