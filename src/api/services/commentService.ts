import { supabase } from '../lib/supabase';
import type { ApiResponse } from '../types';
import type { Comment } from '../schemas/comment';

export class CommentService {
  static async create(reportId: string, content: string, userId: string): Promise<ApiResponse<Comment>> {
    try {
      const { data: comment, error } = await supabase
        .from('report_comments')
        .insert({
          report_id: reportId,
          user_id: userId,
          content
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: comment
      };
    } catch (error) {
      console.error('Error creating comment:', error);
      return {
        success: false,
        error: 'Failed to create comment'
      };
    }
  }

  static async getByReportId(reportId: string): Promise<ApiResponse<Comment[]>> {
    try {
      const { data: comments, error } = await supabase
        .from('report_comments')
        .select('*')
        .eq('report_id', reportId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      return {
        success: true,
        data: comments
      };
    } catch (error) {
      console.error('Error fetching comments:', error);
      return {
        success: false,
        error: 'Failed to fetch comments'
      };
    }
  }
}