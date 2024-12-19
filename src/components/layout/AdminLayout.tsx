import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { FadeIn } from '../animations/FadeIn';
import { Header } from './Header';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { signOut } = useAuth();

  const adminActions = (
    <Button variant="outline" onClick={signOut} className="flex items-center space-x-2">
      <LogOut className="h-4 w-4" />
      <span>Sign out</span>
    </Button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header isAdmin rightContent={adminActions} />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>{children}</FadeIn>
      </main>
    </div>
  );
}