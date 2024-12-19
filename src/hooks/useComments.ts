import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

interface Comment {
  id: string;
  report_id: string;
  user_id: string;
  user_email: string;
  content: string;
  created_at: string;
}

export function useComments(reportId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
    subscribeToComments();
  }, [reportId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('report_comments')
        .select('*')
        .eq('report_id', reportId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToComments = () => {
    const subscription = supabase
      .channel(`report_comments:${reportId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public',
        table: 'report_comments',
        filter: `report_id=eq.${reportId}`
      }, fetchComments)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const addComment = async (content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('report_comments')
        .insert({
          report_id: reportId,
          user_id: user.id,
          user_email: user.email,
          content
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      throw error;
    }
  };

  return { comments, addComment, isLoading };
}