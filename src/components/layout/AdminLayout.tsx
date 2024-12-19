import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { FadeIn } from '../animations/FadeIn';
import { GhanaCoatOfArms } from '../ui/GhanaCoatOfArms';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <nav className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GhanaCoatOfArms className="h-8 w-8" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" onClick={signOut} className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </Button>
          </div>
        </nav>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>{children}</FadeIn>
      </main>
    </div>
  );
}