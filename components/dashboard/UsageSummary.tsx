import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function UsageSummary() {
  return (
    <Card className='p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold'>This Month&apos;s Usage</h2>
        <Button size='sm' variant='outline'>
          View Details
        </Button>
      </div>
      <div className='space-y-4'>
        <div className='flex items-center justify-between text-sm'>
          <span>Generation Credits</span>
          <span>58 of 100 used</span>
        </div>
        <div className='w-full bg-muted rounded-full h-2'>
          <div className='bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 w-[58%]' />
        </div>
        <div className='grid grid-cols-3 gap-4 text-center text-sm'>
          <div>
            <p className='font-medium'>24</p>
            <p className='text-muted-foreground'>Videos Generated</p>
          </div>
          <div>
            <p className='font-medium'>2.4h</p>
            <p className='text-muted-foreground'>Total Duration</p>
          </div>
          <div>
            <p className='font-medium'>94%</p>
            <p className='text-muted-foreground'>Avg. Quality</p>
          </div>
        </div>
      </div>
    </Card>
  );
}