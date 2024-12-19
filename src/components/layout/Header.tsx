import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { GhanaCoatOfArms } from '../ui/GhanaCoatOfArms';
import { GhanaFlagLine } from '../ui/GhanaFlagLine';
import { Button } from '../ui/Button';

interface HeaderProps {
  isAdmin?: boolean;
  rightContent?: React.ReactNode;
}

export function Header({ isAdmin = false, rightContent }: HeaderProps) {
  const location = useLocation();
  const showHomeButton = location.pathname === '/report';

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <nav className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={isAdmin ? "/admin/dashboard" : "/"} className="flex items-center space-x-3 group">
            <GhanaCoatOfArms className="h-8 w-8 transition-transform group-hover:scale-110" />
            <div className="flex flex-col items-start">
              <h1 className="text-base font-bold text-gray-900 dark:text-white">
                {isAdmin ? "Ghana Report Admin" : "Ghana Report"}
              </h1>
              <div className="w-full max-w-[100px] scale-90 origin-left">
                <GhanaFlagLine />
              </div>
            </div>
          </Link>
          {showHomeButton && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="ml-4"
            >
              <Link to="/" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {!isAdmin && (
            <>
              <Link 
                to="/report" 
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                Submit Report
              </Link>
              <Link 
                to="/status" 
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                Check Status
              </Link>
            </>
          )}
          {rightContent}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}