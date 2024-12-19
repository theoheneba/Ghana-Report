import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail, signOut as authSignOut, resetPassword } from '../lib/auth';
import { toast } from 'react-hot-toast';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { user, error: signInError } = await signInWithEmail(email, password);
      
      if (signInError) {
        throw new Error(signInError);
      }

      if (user) {
        navigate('/admin/dashboard');
        toast.success('Welcome back!');
      }
    } catch (e: any) {
      setError(e.message);
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    const success = await authSignOut();
    if (success) {
      navigate('/admin/login');
      toast.success('Signed out successfully');
    }
  };

  const handlePasswordReset = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await resetPassword(email);
      toast.success('Password reset instructions sent');
    } catch (e: any) {
      setError(e.message);
      toast.error('Failed to send reset instructions');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    signOut,
    resetPassword: handlePasswordReset,
    isLoading,
    error
  };
}