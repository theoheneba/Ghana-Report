import React from 'react';
import { Link } from 'react-router-dom';
import { GhanaCoatOfArms } from '../ui/ghana/GhanaCoatOfArms';
import { HeaderStrip } from '../ui/ghana/HeaderStrip';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';

interface HeaderProps {
  isAdmin?: boolean;
  rightContent?: React.ReactNode;
}

export function Header({ isAdmin, rightContent }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to={isAdmin ? "/admin/dashboard" : "/"} className="flex items-center space-x-3">
            <GhanaCoatOfArms className="h-10 w-10" />
            <div className="flex flex-col space-y-1">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Ghana Report {isAdmin && "Admin"}
              </span>
              <HeaderStrip className="w-full" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Secure Anonymous Reporting
              </p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {rightContent ? (
              rightContent
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/status">Check Status</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/report">Submit Report</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}