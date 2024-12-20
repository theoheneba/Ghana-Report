import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { verifyAdminAndUpdateLogin } from '../utils/admin';

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
        throw new Error('No user data returned');
      }

      // Verify admin status and update last login
      await verifyAdminAndUpdateLogin(authData.user.id);
      
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Authentication failed');
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