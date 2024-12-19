import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface CategoryStat {
  category: string;
  count: number;
}

interface DailyStat {
  date: string;
  count: number;
}

export function useReportStats() {
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch category statistics
        const { data: categoryData } = await supabase
          .from('reports')
          .select('category')
          .then(({ data }) => {
            const stats = data?.reduce((acc, { category }) => {
              acc[category] = (acc[category] || 0) + 1;
              return acc;
            }, {} as Record<string, number>);
            
            return {
              data: Object.entries(stats || {}).map(([category, count]) => ({
                category,
                count,
              })),
            };
          });

        // Fetch daily statistics
        const { data: dailyData } = await supabase
          .from('reports')
          .select('created_at')
          .then(({ data }) => {
            const stats = data?.reduce((acc, { created_at }) => {
              const date = new Date(created_at).toISOString().split('T')[0];
              acc[date] = (acc[date] || 0) + 1;
              return acc;
            }, {} as Record<string, number>);
            
            return {
              data: Object.entries(stats || {})
                .map(([date, count]) => ({
                  date,
                  count,
                }))
                .sort((a, b) => a.date.localeCompare(b.date)),
            };
          });

        setCategoryStats(categoryData || []);
        setDailyStats(dailyData || []);
      } catch (error) {
        console.error('Error fetching report statistics:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return {
    categoryStats,
    dailyStats,
    isLoading,
  };
}