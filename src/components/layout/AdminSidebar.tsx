import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { BlogPostModal } from '../blog/BlogPostModal';

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin/dashboard'
  },
  {
    label: 'Blog Posts',
    icon: FileText,
    href: '/admin/blog'
  },
  {
    label: 'Users',
    icon: Users,
    href: '/admin/users'
  }
];

export function AdminSidebar() {
  const location = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  return (
    <div className="w-64 min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="space-y-8">
        <div>
          <Button
            className="w-full justify-start gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Create Post
          </Button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "bg-ghana-yellow/10 text-ghana-yellow"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <BlogPostModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}