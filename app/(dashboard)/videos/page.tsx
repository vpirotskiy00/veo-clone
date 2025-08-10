import { Filter, Plus, Search, Video } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { VideoGrid } from '@/components/videos/VideoGrid';

export const metadata: Metadata = {
  title: 'Videos - Veo 3 Dashboard',
  description: 'Manage your AI-generated videos',
};

// Constants
const PLACEHOLDER_THUMBNAIL = '/api/placeholder/320/180';

// Mock video data
const videos = [
  {
    id: '1',
    title: 'Mountain Sunrise Timelapse',
    description:
      'A beautiful timelapse of the sunrise over snow-capped mountains',
    duration: '0:45',
    status: 'completed' as const,
    quality: '1080p',
    size: '24.5 MB',
    thumbnail: PLACEHOLDER_THUMBNAIL,
    createdAt: '2 hours ago',
    views: 0,
    tags: ['nature', 'timelapse', 'mountains'],
  },
  {
    id: '2',
    title: 'City Street Scene',
    description: 'Bustling city street with cars and pedestrians',
    duration: '1:23',
    status: 'processing' as const,
    quality: '4K',
    size: '156.2 MB',
    thumbnail: PLACEHOLDER_THUMBNAIL,
    createdAt: '4 hours ago',
    views: 0,
    tags: ['urban', 'street', 'traffic'],
  },
  {
    id: '3',
    title: 'Ocean Waves Loop',
    description: 'Seamless loop of ocean waves crashing on the shore',
    duration: '0:30',
    status: 'completed' as const,
    quality: '1080p',
    size: '18.7 MB',
    thumbnail: PLACEHOLDER_THUMBNAIL,
    createdAt: '1 day ago',
    views: 12,
    tags: ['ocean', 'waves', 'loop'],
  },
  {
    id: '4',
    title: 'Forest Walk POV',
    description: 'First-person view walking through a peaceful forest',
    duration: '2:15',
    status: 'completed' as const,
    quality: '4K',
    size: '287.9 MB',
    thumbnail: PLACEHOLDER_THUMBNAIL,
    createdAt: '2 days ago',
    views: 34,
    tags: ['forest', 'pov', 'nature'],
  },
  {
    id: '5',
    title: 'Abstract Particle Flow',
    description: 'Colorful particles flowing in abstract patterns',
    duration: '1:00',
    status: 'failed' as const,
    quality: '1080p',
    size: '0 MB',
    thumbnail: PLACEHOLDER_THUMBNAIL,
    createdAt: '3 days ago',
    views: 0,
    tags: ['abstract', 'particles', 'animation'],
  },
  {
    id: '6',
    title: 'Desert Landscape Drone',
    description: 'Aerial view of vast desert landscape with dunes',
    duration: '1:45',
    status: 'completed' as const,
    quality: '4K',
    size: '198.4 MB',
    thumbnail: PLACEHOLDER_THUMBNAIL,
    createdAt: '1 week ago',
    views: 87,
    tags: ['desert', 'aerial', 'landscape'],
  },
];

export default function VideosPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Videos</h1>
          <p className='text-muted-foreground'>
            Manage and organize your AI-generated videos
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Button asChild variant='outline'>
            <Link href='/videos/upload'>
              <Plus className='h-4 w-4 mr-2' />
              Upload
            </Link>
          </Button>
          <Button asChild>
            <Link href='/videos/generate'>
              <Video className='h-4 w-4 mr-2' />
              Generate Video
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className='flex items-center space-x-4'>
        <div className='relative flex-1 max-w-sm'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input className='pl-10' placeholder='Search videos...' />
        </div>
        <Button size='sm' variant='outline'>
          <Filter className='h-4 w-4 mr-2' />
          Filters
        </Button>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card className='p-4'>
          <div className='text-2xl font-bold'>24</div>
          <div className='text-sm text-muted-foreground'>Total Videos</div>
        </Card>
        <Card className='p-4'>
          <div className='text-2xl font-bold'>22</div>
          <div className='text-sm text-muted-foreground'>Completed</div>
        </Card>
        <Card className='p-4'>
          <div className='text-2xl font-bold'>1</div>
          <div className='text-sm text-muted-foreground'>Processing</div>
        </Card>
        <Card className='p-4'>
          <div className='text-2xl font-bold'>1</div>
          <div className='text-sm text-muted-foreground'>Failed</div>
        </Card>
      </div>

      <VideoGrid videos={videos} />

      {/* Load More */}
      <div className='text-center'>
        <Button variant='outline'>Load More Videos</Button>
      </div>
    </div>
  );
}
