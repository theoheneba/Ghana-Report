import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminUserForm } from '../../components/admin/AdminUserForm';
import { AdminUserList } from '../../components/admin/AdminUserList';
import { Card } from '../../components/ui/Card';
import { useAdminUsers } from '../../hooks/useAdminUsers';

export function AdminManagement() {
  const { users, isLoading, error, createUser, updateUser, deleteUser } = useAdminUsers();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Card className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">
          {error}
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Admin Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage administrators and content authors
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Add New User
            </h3>
            <AdminUserForm onSuccess={() => {}} />
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Current Users
            </h3>
            <AdminUserList 
              admins={users} 
              onDelete={deleteUser}
              onUpdate={updateUser}
            />
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}