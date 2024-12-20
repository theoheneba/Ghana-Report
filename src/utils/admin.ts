import { supabase } from '../lib/supabase';

export async function verifyAdminAndUpdateLogin(userId: string): Promise<void> {
  try {
    // Verify admin status
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', userId)
      .single();

    if (adminError) {
      throw new Error('Error verifying admin status');
    }

    if (!adminData) {
      throw new Error('Unauthorized: Not an admin user');
    }

    // Update last login timestamp
    const { error: updateError } = await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating last login:', updateError);
      // Don't throw here as this is not critical
    }
  } catch (error: any) {
    throw new Error(error.message || 'Failed to verify admin access');
  }
}