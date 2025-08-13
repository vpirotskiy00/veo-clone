import { Loader2 } from 'lucide-react';

import { Card } from '@/components/ui/card';

export default function DashboardLoading() {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <div className='h-8 w-48 bg-muted animate-pulse rounded' />
          <div className='h-4 w-64 bg-muted animate-pulse rounded' />
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card className='p-6' key={i}>
            <div className='flex items-center justify-between mb-2'>
              <div className='h-4 w-4 bg-muted animate-pulse rounded' />
            </div>
            <div className='space-y-2'>
              <div className='h-8 w-16 bg-muted animate-pulse rounded' />
              <div className='h-3 w-12 bg-muted animate-pulse rounded' />
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Quick Actions */}
        <div className='lg:col-span-2 space-y-4'>
          <div className='h-6 w-32 bg-muted animate-pulse rounded' />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Card className='p-6' key={i}>
                <div className='flex items-start space-x-4'>
                  <div className='h-12 w-12 bg-muted animate-pulse rounded-lg' />
                  <div className='flex-1 space-y-2'>
                    <div className='h-4 w-24 bg-muted animate-pulse rounded' />
                    <div className='h-3 w-32 bg-muted animate-pulse rounded' />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Videos */}
        <div className='space-y-4'>
          <div className='h-6 w-28 bg-muted animate-pulse rounded' />
          <div className='space-y-3'>
            {Array.from({ length: 3 }).map((_, i) => (
              <Card className='p-4' key={i}>
                <div className='flex items-center space-x-3'>
                  <div className='h-12 w-20 bg-muted animate-pulse rounded' />
                  <div className='flex-1 space-y-2'>
                    <div className='h-4 w-24 bg-muted animate-pulse rounded' />
                    <div className='h-3 w-16 bg-muted animate-pulse rounded' />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      <div className='flex items-center justify-center py-8'>
        <div className='flex items-center space-x-2 text-muted-foreground'>
          <Loader2 className='h-4 w-4 animate-spin' />
          <span className='text-sm'>Loading dashboard...</span>
        </div>
      </div>
    </div>
  );
}
