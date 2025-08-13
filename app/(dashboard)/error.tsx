'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { useCallback, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
  const handleGoHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className='flex items-center justify-center min-h-[400px] p-4'>
      <Card className='p-8 max-w-md w-full text-center'>
        <div className='flex justify-center mb-4'>
          <AlertCircle className='h-12 w-12 text-destructive' />
        </div>

        <h2 className='text-xl font-semibold mb-2'>Something went wrong</h2>

        <p className='text-muted-foreground mb-6'>
          An error occurred while loading the dashboard. Please try again.
        </p>

        <div className='space-y-3'>
          <Button className='w-full' onClick={reset}>
            <RefreshCw className='h-4 w-4 mr-2' />
            Try Again
          </Button>

          <Button className='w-full' onClick={handleGoHome} variant='outline'>
            Go Home
          </Button>
        </div>

        {error.digest && (
          <p className='text-xs text-muted-foreground mt-4'>
            Error ID: {error.digest}
          </p>
        )}
      </Card>
    </div>
  );
}
