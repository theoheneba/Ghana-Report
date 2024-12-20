import { supabase } from '../lib/supabase';
import type { ApiResponse } from '../types';
import type { AdminUser } from '../types/admin';

export class AdminService {
  static async createAdmin(
    email: string, 
    password: string, 
    name: string,
    role: 'admin' | 'author' = 'author',
    team_name: string = 'Ghana Report Team'
  ): Promise<ApiResponse<AdminUser>> {
    try {
      // First check if user already exists
      const { data: existingUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            team_name
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user');

      // Wait for trigger to create admin user
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Fetch the created admin user
      const { data: adminUser, error: fetchError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (fetchError) throw fetchError;
      if (!adminUser) throw new Error('Failed to create admin user record');

      return {
        success: true,
        data: adminUser
      };
    } catch (error: any) {
      console.error('Error creating user:', error);
      return {
        success: false,
        error: error.message || 'Failed to create user'
      };
    }
  }

  static async verifyUser(userId: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase.rpc('verify_user', {
        user_id: userId
      });

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error('Error verifying user:', error);
      return {
        success: false,
        error: error.message || 'Failed to verify user'
      };
    }
  }

  static async deleteAdmin(id: string): Promise<ApiResponse<void>> {
    try {
      // First delete auth user (will cascade to admin_users)
      const { error: authError } = await supabase.auth.admin.deleteUser(id);
      if (authError) throw authError;

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting user:', error);
      return {
        success: false,
        error: error.message || 'Failed to delete user'
      };
    }
  }
}