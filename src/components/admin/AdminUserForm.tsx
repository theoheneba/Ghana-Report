import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AdminService } from '../../api/services/adminService';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { CreateAdminData } from '../../api/types/admin';

interface AdminUserFormProps {
  onSuccess?: () => void;
}

export function AdminUserForm({ onSuccess }: AdminUserFormProps) {
  const [formData, setFormData] = useState<CreateAdminData>({
    email: '',
    password: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await AdminService.createAdmin(
        formData.email,
        formData.password,
        formData.name
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success('Admin user created successfully');
      setFormData({ email: '', password: '', name: '' });
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to create admin user');
      console.error('Error creating admin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        required
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
      />
      <Input
        type="email"
        label="Email"
        required
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
      />
      <Input
        type="password"
        label="Password"
        required
        minLength={8}
        value={formData.password}
        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Admin User'}
      </Button>
    </form>
  );
}