import { supabase } from './supabase';
import { toast } from 'react-hot-toast';

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Verify admin status
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', data.user.id)
      .single();

    if (!adminUser) {
      throw new Error('Unauthorized access');
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.user.id);

    return { user: data.user, error: null };
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      user: null,
      error: error.message || 'Invalid credentials'
    };
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast.error('Error signing out');
    return false;
  }
  return true;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/admin/reset-password`,
  });
  
  if (error) {
    throw error;
  }
  
  return true;
}