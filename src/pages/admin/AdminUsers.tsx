import React, { useState, useEffect } from 'react';
import { AdminService } from '../../api/services/adminService';
import { AdminUserForm } from '../../components/admin/AdminUserForm';
import { AdminUserList } from '../../components/admin/AdminUserList';
import { AdminLayout } from '../../components/layout/AdminLayout';
import type { AdminUser } from '../../api/types/admin';

export function AdminUsers() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdmins = async () => {
    try {
      const result = await AdminService.getAdmins();
      if (result.success) {
        setAdmins(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Admin Users</h2>
          <p className="text-gray-600 dark:text-gray-300">Manage administrator accounts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Create New Admin</h3>
            <AdminUserForm onSuccess={fetchAdmins} />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Current Admins</h3>
            <AdminUserList admins={admins} onDelete={fetchAdmins} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}