import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { GhanaFlagLine } from '../components/ui/GhanaFlagLine';
import { PageLayout } from '../components/layout/PageLayout';

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
    <PageLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full space-y-8 p-8 shadow-xl">
          <div className="flex flex-col items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/59/Coat_of_arms_of_Ghana.svg"
              alt="Ghana Coat of Arms"
              className="h-24 w-24 mb-6 animate-fadeIn"
            />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isResetMode ? 'Reset Password' : 'Admin Portal'}
            </h2>
            <div className="w-32 mx-auto my-4">
              <GhanaFlagLine />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isResetMode 
                ? 'Enter your email to receive reset instructions'
                : 'Sign in to access the administrative dashboard'}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-5 h-5" />}
                placeholder="admin@example.com"
                className="py-3"
              />

              {!isResetMode && (
                <Input
                  label="Password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="w-5 h-5" />}
                  placeholder="••••••••"
                  className="py-3"
                />
              )}
            </div>

            <div className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full py-3 group"
                disabled={isLoading}
              >
                <span className="flex items-center justify-center">
                  {isLoading 
                    ? (isResetMode ? 'Sending...' : 'Signing in...') 
                    : (isResetMode ? 'Send Reset Instructions' : 'Sign in')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              <button
                type="button"
                onClick={() => setIsResetMode(!isResetMode)}
                className="text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors"
              >
                {isResetMode 
                  ? '← Back to login' 
                  : 'Forgot your password?'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </PageLayout>
  );
}