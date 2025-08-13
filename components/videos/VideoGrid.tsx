import {
  Download,
  Edit,
  MoreHorizontal,
  Play,
  Share,
  Trash2,
  Video,
} from 'lucide-react';

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

interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'processing' | 'failed';
  quality: string;
  size: string;
  thumbnail: string;
  createdAt: string;
  views: number;
  tags: string[];
}

interface VideoGridProps {
  videos: VideoItem[];
}

const statusColors = {
  completed:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  processing:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {videos.map(video => (
        <Card
          className='overflow-hidden group hover:shadow-lg transition-shadow'
          key={video.id}
        >
          <div className='relative aspect-video bg-muted'>
            <div className='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center'>
              <Video className='h-12 w-12 text-muted-foreground' />
            </div>

            {video.status === 'completed' && (
              <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                <Button className='rounded-full w-12 h-12 p-0' size='sm'>
                  <Play className='h-5 w-5 fill-current' />
                </Button>
              </div>
            )}

            <div className='absolute top-2 right-2'>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[video.status]}`}
              >
                {video.status}
              </span>
            </div>

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
  );
}