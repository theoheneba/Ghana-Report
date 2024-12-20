import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { FadeIn } from '../animations/FadeIn';
import { Header } from './Header';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { signOut } = useAuth();
  const location = useLocation();

  const adminActions = (
    <Button
      variant="outline"
      size="sm"
      onClick={signOut}
      className="flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
    >
      <LogOut className="w-4 h-4" />
      <span>Sign out</span>
    </Button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header isAdmin rightContent={adminActions} />

      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8">
          <FadeIn>{children}</FadeIn>
        </main>
      </div>
    </div>
  );
}