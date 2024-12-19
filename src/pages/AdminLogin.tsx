import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const { signIn, resetPassword, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isResetMode) {
      await resetPassword(email);
    } else {
      await signIn(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8">
        <div className="flex flex-col items-center">
          <Shield className="h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {isResetMode ? 'Reset Password' : 'Admin Login'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isResetMode 
              ? 'Enter your email to receive reset instructions'
              : 'Sign in to access the admin dashboard'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {!isResetMode && (
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading 
                ? (isResetMode ? 'Sending...' : 'Signing in...') 
                : (isResetMode ? 'Send Reset Instructions' : 'Sign in')}
            </Button>

            <button
              type="button"
              onClick={() => setIsResetMode(!isResetMode)}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {isResetMode 
                ? 'Back to login' 
                : 'Forgot your password?'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}