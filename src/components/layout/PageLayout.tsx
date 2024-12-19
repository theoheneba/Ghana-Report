import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../animations/FadeIn';
import { Header } from './Header';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function PageLayout({ children, title = "Ghana Report", subtitle }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <main className="max-w-[1600px] mx-auto px-4">
        <FadeIn>{children}</FadeIn>
      </main>

      <footer className="mt-auto py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/report" className="text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400">
                    Submit Report
                  </Link>
                </li>
                <li>
                  <Link to="/status" className="text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400">
                    Check Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Ghana Report. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}