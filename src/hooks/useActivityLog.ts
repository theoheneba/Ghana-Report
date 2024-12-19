import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

interface Activity {
  id: string;
  report_id: string;
  user_id: string;
  user_email: string;
  type: 'status_change' | 'comment' | 'update';
  description: string;
  created_at: string;
}

export function useActivityLog(reportId: string) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
    subscribeToActivities();
  }, [reportId]);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('report_activities')
        .select('*')
        .eq('report_id', reportId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast.error('Failed to load activity log');
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToActivities = () => {
    const subscription = supabase
      .channel(`report_activities:${reportId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public',
        table: 'report_activities',
        filter: `report_id=eq.${reportId}`
      }, fetchActivities)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  return { activities, isLoading };
}