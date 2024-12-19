import { supabase } from '../lib/supabase';
import type { ApiResponse } from '../types';

export class EvidenceService {
  static async uploadFile(file: File, reportId: string): Promise<ApiResponse<string>> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${reportId}/${Math.random().toString(36).slice(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('report-evidence')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('report-evidence')
        .getPublicUrl(fileName);

      return {
        success: true,
        data: publicUrl
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      return {
        success: false,
        error: 'Failed to upload file'
      };
    }
  }

  static async getFiles(reportId: string): Promise<ApiResponse<string[]>> {
    try {
      const { data, error } = await supabase.storage
        .from('report-evidence')
        .list(reportId);

      if (error) throw error;

      const urls = data.map(file => {
        const { data: { publicUrl } } = supabase.storage
          .from('report-evidence')
          .getPublicUrl(`${reportId}/${file.name}`);
        return publicUrl;
      });

      return {
        success: true,
        data: urls
      };
    } catch (error) {
      console.error('Error fetching files:', error);
      return {
        success: false,
        error: 'Failed to fetch files'
      };
    }
  }
}