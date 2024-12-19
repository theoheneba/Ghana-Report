import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { uploadFile } from '../utils/storage';
import type { Report } from '../types/report';

export function useReportSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);

  const submitReport = async (report: Report) => {
    setIsSubmitting(true);
    try {
      // First, insert the report
      const { data, error } = await supabase
        .from('reports')
        .insert([{
          title: report.title,
          category: report.category,
          description: report.description,
          date: report.date,
          location: report.location,
          willing_to_testify: report.willingToTestify
        }])
        .select('report_id')
        .single();

      if (error) throw error;

      // Then, upload files if any
      if (report.files.length > 0) {
        await Promise.all(
          report.files.map(file => uploadFile(file, data.report_id))
        );
      }

      setReportId(data.report_id);
      toast.success('Report submitted successfully');
      return data.report_id;
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report. Please try again.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setReportId(null);
    setIsSubmitting(false);
  };

  return {
    submitReport,
    isSubmitting,
    reportId,
    reset
  };
}