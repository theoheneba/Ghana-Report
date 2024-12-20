import React from 'react';
import { LogOut, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="text-gray-600 dark:text-gray-300"
      >
        <Link to="/admin/users" className="flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>Manage Admins</span>
        </Link>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={signOut}
        className="flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign out</span>
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header isAdmin rightContent={adminActions} />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>{children}</FadeIn>
      </main>

      <footer className="mt-auto py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto px-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Ghana Report Admin Portal
          </p>
        </div>
      </footer>
    </div>
  );
}