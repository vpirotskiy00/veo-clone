import {
  Download,
  Edit,
  Filter,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Share,
  Trash2,
  Video,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

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
    status: 'completed',
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
    status: 'processing',
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
    status: 'completed',
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
    status: 'completed',
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
    status: 'failed',
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
    status: 'completed',
    quality: '4K',
    size: '198.4 MB',
    thumbnail: PLACEHOLDER_THUMBNAIL,
    createdAt: '1 week ago',
    views: 87,
    tags: ['desert', 'aerial', 'landscape'],
  },
];

const statusColors = {
  completed:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  processing:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

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
            <Link href='/dashboard/videos/upload'>
              <Plus className='h-4 w-4 mr-2' />
              Upload
            </Link>
          </Button>
          <Button asChild>
            <Link href='/dashboard/videos/generate'>
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

      {/* Videos Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {videos.map(video => (
          <Card
            className='overflow-hidden group hover:shadow-lg transition-shadow'
            key={video.id}
          >
            <div className='relative aspect-video bg-muted'>
              {/* Thumbnail placeholder */}
              <div className='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center'>
                <Video className='h-12 w-12 text-muted-foreground' />
              </div>

              {/* Play overlay */}
              {video.status === 'completed' && (
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                  <Button className='rounded-full w-12 h-12 p-0' size='sm'>
                    <Play className='h-5 w-5 fill-current' />
                  </Button>
                </div>
              )}

              {/* Status badge */}
              <div className='absolute top-2 right-2'>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[video.status as keyof typeof statusColors]}`}
                >
                  {video.status}
                </span>
              </div>

              {/* Duration */}
              <div className='absolute bottom-2 right-2'>
                <span className='bg-black/70 text-white px-2 py-1 rounded text-xs'>
                  {video.duration}
                </span>
              </div>
            </div>

            <div className='p-4'>
              <div className='flex items-start justify-between mb-2'>
                <h3 className='font-semibold text-sm leading-tight line-clamp-2'>
                  {video.title}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className='h-8 w-8 p-0 opacity-0 group-hover:opacity-100'
                      size='sm'
                      variant='ghost'
                    >
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Play className='h-4 w-4 mr-2' />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className='h-4 w-4 mr-2' />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className='h-4 w-4 mr-2' />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className='h-4 w-4 mr-2' />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='text-red-600'>
                      <Trash2 className='h-4 w-4 mr-2' />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className='text-xs text-muted-foreground mb-3 line-clamp-2'>
                {video.description}
              </p>

              <div className='space-y-2'>
                <div className='flex items-center justify-between text-xs text-muted-foreground'>
                  <span>{video.quality}</span>
                  <span>{video.size}</span>
                </div>
                <div className='flex items-center justify-between text-xs text-muted-foreground'>
                  <span>{video.views} views</span>
                  <span>{video.createdAt}</span>
                </div>
              </div>

              {/* Tags */}
              <div className='flex flex-wrap gap-1 mt-2'>
                {video.tags.slice(0, 2).map(tag => (
                  <span
                    className='bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs'
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
                {video.tags.length > 2 && (
                  <span className='bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs'>
                    +{video.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className='text-center'>
        <Button variant='outline'>Load More Videos</Button>
      </div>
    </div>
  );
}
