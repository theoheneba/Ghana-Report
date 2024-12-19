import { supabase } from '../lib/supabase';
import type { ApiResponse } from '../types/api';
import type { Database } from '../types/database';

type Activity = Database['public']['Tables']['report_activities']['Row'];

export class ActivityService {
  static async getByReportId(reportId: string): Promise<ApiResponse<Activity[]>> {
    try {
      const { data: activities, error } = await supabase
        .from('report_activities')
        .select('*')
        .eq('report_id', reportId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: activities
      };
    } catch (error) {
      console.error('Error fetching activities:', error);
      return {
        success: false,
        error: 'Failed to fetch activities'
      };
    }
  }
}