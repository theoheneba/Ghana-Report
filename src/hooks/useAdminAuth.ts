import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export function useAdminAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // First attempt to sign in
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        throw new Error('Invalid email or password');
      }

      if (!authData.user) {
        throw new Error('Login failed');
      }

      // Verify admin status
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('verified, role')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (adminError || !adminData) {
        throw new Error('Access denied');
      }

      if (!adminData.verified) {
        throw new Error('Your account is pending verification');
      }

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', authData.user.id);

      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
      toast.error(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/admin/login');
      toast.success('Signed out successfully');
    } catch (err) {
      toast.error('Error signing out');
    }
  };

  return {
    signIn,
    signOut,
    isLoading,
    error
  };
}