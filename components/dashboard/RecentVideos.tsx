import { Video } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RecentVideo {
  id: string;
  title: string;
  duration: string;
  status: 'completed' | 'processing';
  thumbnail: string;
  createdAt: string;
}

interface RecentVideosProps {
  videos: RecentVideo[];
}

export function RecentVideos({ videos }: RecentVideosProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>Recent Videos</h2>
        <Button asChild size='sm' variant='outline'>
          <Link href='/videos'>View all</Link>
        </Button>
      </div>
      <div className='space-y-3'>
        {videos.map(video => (
          <Card className='p-4' key={video.id}>
            <div className='flex items-center space-x-3'>
              <div className='w-16 h-9 bg-muted rounded-md flex items-center justify-center'>
                <Video className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium truncate'>{video.title}</p>
                <div className='flex items-center space-x-2 text-xs text-muted-foreground'>
                  <span>{video.duration}</span>
                  <span>•</span>
                  <span>{video.createdAt}</span>
                </div>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  video.status === 'completed'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}
              >
                {video.status}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
