import { supabase } from '../lib/supabase';
import type { ApiResponse } from '../types/api';
import type { AdminUser } from '../types/admin';

export class AdminService {
  static async createAdmin(email: string, password: string, name: string): Promise<ApiResponse<AdminUser>> {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });

      if (authError) throw authError;

      // Create admin user record
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .insert({
          id: authData.user.id,
          email: email,
          name: name
        })
        .select()
        .single();

      if (adminError) throw adminError;

      return {
        success: true,
        data: adminData
      };
    } catch (error) {
      console.error('Error creating admin:', error);
      return {
        success: false,
        error: 'Failed to create admin user'
      };
    }
  }

  static async getAdmins(): Promise<ApiResponse<AdminUser[]>> {
    try {
      const { data: admins, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: admins
      };
    } catch (error) {
      console.error('Error fetching admins:', error);
      return {
        success: false,
        error: 'Failed to fetch admin users'
      };
    }
  }

  static async updateAdmin(id: string, updates: Partial<AdminUser>): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('admin_users')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Error updating admin:', error);
      return {
        success: false,
        error: 'Failed to update admin user'
      };
    }
  }

  static async deleteAdmin(id: string): Promise<ApiResponse<void>> {
    try {
      // Delete from auth.users (will cascade to admin_users)
      const { error: authError } = await supabase.auth.admin.deleteUser(id);

      if (authError) throw authError;

      return { success: true };
    } catch (error) {
      console.error('Error deleting admin:', error);
      return {
        success: false,
        error: 'Failed to delete admin user'
      };
    }
  }
}