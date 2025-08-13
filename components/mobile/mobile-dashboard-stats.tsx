'use client';

import { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface StatCard {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  progress?: number;
}

interface MobileDashboardStatsProps {
  stats: StatCard[];
  className?: string;
}

export function MobileDashboardStats({
  stats,
  className,
}: MobileDashboardStatsProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-4', className)}>
      {stats.map((stat, index) => (
        <Card className='overflow-hidden' key={index}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
            {stat.icon && (
              <stat.icon className='h-4 w-4 text-muted-foreground' />
            )}
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stat.value}</div>
            {stat.description && (
              <p className='text-xs text-muted-foreground mt-1'>
                {stat.description}
              </p>
            )}
            {stat.trend && (
              <div className='flex items-center mt-2'>
                <span
                  className={cn(
                    'text-xs font-medium',
                    stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {stat.trend.isPositive ? '+' : '-'}
                  {Math.abs(stat.trend.value)}%
                </span>
                <span className='text-xs text-muted-foreground ml-1'>
                  from last month
                </span>
              </div>
            )}
            {stat.progress !== undefined && (
              <Progress className='mt-3 h-2' value={stat.progress} />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
