import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Report = Database['public']['Tables']['reports']['Row'];

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReports() {
      try {
        const { data, error: fetchError } = await supabase
          .from('reports')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setReports(data || []);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Failed to load reports');
      } finally {
        setIsLoading(false);
      }
    }

    fetchReports();
  }, []);

  const updateReportStatus = async (reportId: string, status: string) => {
    try {
      const { error: updateError } = await supabase
        .from('reports')
        .update({ status })
        .eq('id', reportId);

      if (updateError) throw updateError;

      setReports(reports.map(report => 
        report.id === reportId ? { ...report, status } : report
      ));
    } catch (err) {
      console.error('Error updating report status:', err);
      throw new Error('Failed to update report status');
    }
  };

  return {
    reports,
    isLoading,
    error,
    updateReportStatus
  };
}