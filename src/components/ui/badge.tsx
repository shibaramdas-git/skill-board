import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'w-[60px] inline-flex items-center justify-center rounded-sm border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap',
  {
    variants: {
      variant: {
        default:
          'bg-blue-100 text-blue-800 me-2 dark:bg-gray-900 dark:text-blue-400 border border-blue-400',
        green:
          'bg-green-100 text-green-800 text-xs me-2 dark:bg-gray-900 dark:text-green-400 border border-green-400',
        dark: 'bg-gray-100 text-gray-800 text-xs me-2 dark:bg-gray-900 dark:text-gray-400 border border-gray-500',
        red: 'bg-red-100 text-red-800 text-xs me-2 dark:bg-gray-900 dark:text-red-400 border border-red-400',
        yellow:
          'bg-yellow-100 text-yellow-800 text-xs me-2 dark:bg-gray-900 dark:text-yellow-300 border border-yellow-500'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
