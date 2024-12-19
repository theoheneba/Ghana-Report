import React from 'react';
import { useActivityLog } from '../../hooks/useActivityLog';
import { formatDate } from '../../utils/date';
import { Badge } from '../ui/Badge';

interface ActivityLogProps {
  reportId: string;
}

export function ActivityLog({ reportId }: ActivityLogProps) {
  const { activities, isLoading } = useActivityLog(reportId);

  if (isLoading) {
    return <div>Loading activity log...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Activity Log</h3>
      
      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Badge variant={activity.type === 'status_change' ? 'blue' : 'default'}>
              {activity.type}
            </Badge>
            <div className="flex-1">
              <p className="text-gray-700 dark:text-gray-300">{activity.description}</p>
              <div className="mt-1 flex justify-between text-sm text-gray-500">
                <span>{activity.user_email}</span>
                <span>{formatDate(activity.created_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}