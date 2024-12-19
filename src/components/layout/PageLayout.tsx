import React from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { FadeIn } from '../animations/FadeIn';
import { Link } from 'react-router-dom';
import { GhanaCoatOfArms } from '../ui/GhanaCoatOfArms';
import { GhanaFlagLine } from '../ui/GhanaFlagLine';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function PageLayout({ children, title = "Ghana Report", subtitle }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <nav className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <GhanaCoatOfArms className="h-8 w-8 transition-transform group-hover:scale-110" />
            <div className="flex flex-col items-start">
              <h1 className="text-base font-bold text-gray-900 dark:text-white">{title}</h1>
              <div className="w-full max-w-[100px] scale-90 origin-left">
                <GhanaFlagLine />
              </div>
              {subtitle && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{subtitle}</p>
              )}
            </div>
          </Link>
          <div className="flex items-center space-x-4">
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
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="max-w-[1600px] mx-auto px-4">
        <FadeIn>{children}</FadeIn>
      </main>

      <footer className="mt-auto py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Ghana Report. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="hover:text-yellow-600 dark:hover:text-yellow-400">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-yellow-600 dark:hover:text-yellow-400">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}