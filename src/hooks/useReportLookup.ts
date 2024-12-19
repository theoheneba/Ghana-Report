import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Report } from '../types/report';

export function useReportLookup() {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupReport = async (reportId: string) => {
    setIsLoading(true);
    setError(null);
    setReport(null);
    
    try {
      const { data, error: lookupError } = await supabase
        .from('reports')
        .select(`
          id,
          report_id,
          title,
          category,
          description,
          date,
          location,
          status,
          created_at,
          willing_to_testify
        `)
        .eq('report_id', reportId.trim())
        .maybeSingle();

      if (!data) {
        setError('No report found with this ID. Please check and try again.');
        return;
      }

      if (lookupError) throw lookupError;

      setReport(data as Report);
    } catch (err) {
      console.error('Error looking up report:', err);
      setError('Failed to look up report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    lookupReport,
    report,
    isLoading,
    error
  };
}