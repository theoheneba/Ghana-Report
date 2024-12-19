import React from 'react';
import { UserX } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AdminService } from '../../api/services/adminService';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import type { AdminUser } from '../../api/types/admin';

interface AdminUserListProps {
  admins: AdminUser[];
  onDelete?: () => void;
}

export function AdminUserList({ admins, onDelete }: AdminUserListProps) {
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this admin user?')) return;

    try {
      const result = await AdminService.deleteAdmin(id);
      if (!result.success) throw new Error(result.error);
      
      toast.success('Admin user deleted');
      onDelete?.();
    } catch (error) {
      toast.error('Failed to delete admin user');
      console.error('Error deleting admin:', error);
    }
  };

  return (
    <div className="space-y-4">
      {admins.map(admin => (
        <Card key={admin.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{admin.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{admin.email}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Last login: {admin.last_login ? new Date(admin.last_login).toLocaleString() : 'Never'}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(admin.id)}
              className="text-red-600 hover:text-red-700"
            >
              <UserX className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}