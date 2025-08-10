import { LucideIcon } from 'lucide-react';

import { Card } from '@/components/ui/card';

interface StatItem {
  title: string;
  value: string;
  change: string;
  trending: 'up' | 'down';
  icon: LucideIcon;
}

interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {stats.map(stat => (
        <Card className='p-6' key={stat.title}>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <stat.icon className='h-4 w-4 text-muted-foreground' />
              <p className='text-sm font-medium text-muted-foreground'>
                {stat.title}
              </p>
            </div>
          </div>
          <div className='flex items-baseline space-x-2 mt-2'>
            <p className='text-2xl font-bold'>{stat.value}</p>
            <p
              className={`text-xs ${
                stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}