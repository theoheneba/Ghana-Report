import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import type { AdminUser } from '../types/admin';

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (userData: Partial<AdminUser>) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .insert([userData])
        .select()
        .single();

      if (error) throw error;
      
      setUsers(prev => [data, ...prev]);
      toast.success('User created successfully');
    } catch (err) {
      console.error('Error creating user:', err);
      toast.error('Failed to create user');
      throw err;
    }
  };

  const updateUser = async (id: string, updates: Partial<AdminUser>) => {
    try {
      const { error } = await supabase
        .from('admin_users')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, ...updates } : user
      ));
      toast.success('User updated successfully');
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error('Failed to update user');
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setUsers(prev => prev.filter(user => user.id !== id));
      toast.success('User deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('Failed to delete user');
      throw err;
    }
  };

  return {
    users,
    isLoading,
    error,
    createUser,
    updateUser,
    deleteUser
  };
}