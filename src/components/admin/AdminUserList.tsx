import React from 'react';
import { UserX, Shield, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AdminService } from '../../api/services/adminService';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { AdminUser } from '../../types/admin';

interface AdminUserListProps {
  admins: AdminUser[];
  onDelete?: () => void;
  onUpdate?: (id: string, updates: Partial<AdminUser>) => void;
}

export function AdminUserList({ admins, onDelete, onUpdate }: AdminUserListProps) {
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const result = await AdminService.deleteAdmin(id);
      if (!result.success) throw new Error(result.error);
      
      toast.success('User deleted successfully');
      onDelete?.();
    } catch (error) {
      toast.error('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  const handleVerify = async (id: string) => {
    try {
      const result = await AdminService.verifyAuthor(id);
      if (!result.success) throw new Error(result.error);
      
      toast.success('Author verified successfully');
      onUpdate?.(id, { verified: true });
    } catch (error) {
      toast.error('Failed to verify author');
      console.error('Error verifying author:', error);
    }
  };

  return (
    <div className="space-y-4">
      {admins.map(admin => (
        <Card key={admin.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {admin.name}
                </h3>
                <Badge variant={admin.role === 'admin' ? 'red' : 'yellow'}>
                  {admin.role}
                </Badge>
                {admin.verified && (
                  <Badge variant="green" className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{admin.email}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Team: {admin.team_name}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Last login: {admin.last_login ? new Date(admin.last_login).toLocaleString() : 'Never'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {admin.role === 'author' && !admin.verified && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVerify(admin.id)}
                  className="text-green-600 hover:text-green-700"
                >
                  <Shield className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(admin.id)}
                className="text-red-600 hover:text-red-700"
              >
                <UserX className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}