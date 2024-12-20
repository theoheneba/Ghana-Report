import React from 'react';
import { Link } from 'react-router-dom';
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-ghana-yellow text-gray-900 hover:bg-ghana-yellow/90 dark:bg-ghana-yellow/90 dark:text-gray-900 dark:hover:bg-ghana-yellow/80",
        destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
        outline: "border border-gray-200 bg-white hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:text-gray-50",
        secondary: "bg-ghana-green text-white hover:bg-ghana-green/90 dark:bg-ghana-green/90 dark:hover:bg-ghana-green/80",
        ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-50"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  to?: string;
}

export function Button({ 
  className, 
  variant, 
  size, 
  asChild = false,
  to,
  ...props 
}: ButtonProps) {
  if (to) {
    return (
      <Link
        to={to}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}