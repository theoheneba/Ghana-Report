import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AdminService } from '../../api/services/adminService';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import type { CreateAdminData } from '../../api/types/admin';

interface AdminUserFormProps {
  onSuccess?: () => void;
}

export function AdminUserForm({ onSuccess }: AdminUserFormProps) {
  const [formData, setFormData] = useState<CreateAdminData>({
    email: '',
    password: '',
    name: '',
    role: 'author',
    team_name: 'Ghana Report Team'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await AdminService.createAdmin(
        formData.email,
        formData.password,
        formData.name,
        formData.role,
        formData.team_name
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success('User created successfully');
      setFormData({ email: '', password: '', name: '', role: 'author', team_name: 'Ghana Report Team' });
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to create user');
      console.error('Error creating user:', error);
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
      <Select
        label="Role"
        value={formData.role}
        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'admin' | 'author' }))}
        options={[
          { value: 'author', label: 'Author' },
          { value: 'admin', label: 'Administrator' }
        ]}
      />
      <Input
        label="Team Name"
        value={formData.team_name}
        onChange={(e) => setFormData(prev => ({ ...prev, team_name: e.target.value }))}
        placeholder="Ghana Report Team"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create User'}
      </Button>
    </form>
  );
}