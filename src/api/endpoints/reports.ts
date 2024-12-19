import { supabase } from '../lib/supabase';
import { ReportSchema, type Report } from '../schemas/report';
import type { ApiResponse } from '../types';

export async function createReport(data: Report): Promise<ApiResponse<{ report_id: string }>> {
  try {
    const validatedData = ReportSchema.parse(data);
    
    const { data: report, error } = await supabase
      .from('reports')
      .insert([validatedData])
      .select('report_id')
      .single();

    if (error) throw error;

    return {
      success: true,
      data: { report_id: report.report_id }
    };
  } catch (error) {
    console.error('Error creating report:', error);
    return {
      success: false,
      error: 'Failed to create report'
    };
  }
}

export async function getReport(reportId: string): Promise<ApiResponse<Report>> {
  try {
    const { data: report, error } = await supabase
      .from('reports')
      .select('*')
      .eq('report_id', reportId)
      .single();

    if (error) throw error;
    if (!report) throw new Error('Report not found');

    return {
      success: true,
      data: report
    };
  } catch (error) {
    console.error('Error fetching report:', error);
    return {
      success: false,
      error: 'Report not found'
    };
  }
}

export async function updateReportStatus(
  reportId: string, 
  status: string
): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase
      .from('reports')
      .update({ status })
      .eq('report_id', reportId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error updating report status:', error);
    return {
      success: false,
      error: 'Failed to update report status'
    };
  }
}