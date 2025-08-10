import {
  Clock,
  Download,
  Filter,
  FolderOpen,
  Grid3X3,
  List,
  MoreHorizontal,
  Play,
  Search,
  Share,
  Video,
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Library - Veo 3',
  description: 'Browse and manage your video library',
};

// Mock video library data
const VIDEO_FORMAT = 'MP4';
const VIDEO_STATUS_READY = 'ready';
const VIDEO_STATUS_PROCESSING = 'processing';
const PLACEHOLDER_THUMBNAIL = '/api/placeholder/300/200';

const videos = [
  {
    id: '1',
    title: 'Mountain Sunrise Timelapse',
    thumbnail: PLACEHOLDER_THUMBNAIL,
    duration: '0:45',
    size: '24.5 MB',
    format: VIDEO_FORMAT,
    status: VIDEO_STATUS_READY,
    createdAt: '2024-02-10',
    views: 1234,
  },
  {
    id: '2',
    title: 'City Street Scene - Downtown',
    thumbnail: PLACEHOLDER_THUMBNAIL,
    duration: '1:23',
    size: '67.2 MB',
    format: VIDEO_FORMAT,
    status: VIDEO_STATUS_READY,
    createdAt: '2024-02-09',
    views: 892,
  },
  {
    id: '3',
    title: 'Ocean Waves Meditation',
    thumbnail: PLACEHOLDER_THUMBNAIL,
    duration: '0:30',
    size: '18.1 MB',
    format: VIDEO_FORMAT,
    status: VIDEO_STATUS_READY,
    createdAt: '2024-02-08',
    views: 2156,
  },
  {
    id: '4',
    title: 'Forest Walk Adventure',
    thumbnail: PLACEHOLDER_THUMBNAIL,
    duration: '2:15',
    size: '124.8 MB',
    format: VIDEO_FORMAT,
    status: VIDEO_STATUS_PROCESSING,
    createdAt: '2024-02-08',
    views: 0,
  },
  {
    id: '5',
    title: 'Abstract Art Animation',
    thumbnail: PLACEHOLDER_THUMBNAIL,
    duration: '1:02',
    size: '45.3 MB',
    format: VIDEO_FORMAT,
    status: VIDEO_STATUS_READY,
    createdAt: '2024-02-07',
    views: 567,
  },
  {
    id: '6',
    title: 'Space Journey Visualization',
    thumbnail: PLACEHOLDER_THUMBNAIL,
    duration: '1:45',
    size: '89.7 MB',
    format: VIDEO_FORMAT,
    status: VIDEO_STATUS_READY,
    createdAt: '2024-02-06',
    views: 1789,
  },
];

const folders = [
  { id: '1', name: 'Nature & Landscapes', count: 12 },
  { id: '2', name: 'Urban Scenes', count: 8 },
  { id: '3', name: 'Abstract Art', count: 5 },
  { id: '4', name: 'Promotional Videos', count: 3 },
];

export default function LibraryPage() {
  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight'>Library</h1>
          <p className='text-muted-foreground'>
            Browse and manage your video collection
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <button className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'>
            <List className='h-4 w-4 mr-2' />
            List View
          </button>
          <button className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>
            <Grid3X3 className='h-4 w-4 mr-2' />
            Grid View
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <input
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            placeholder='Search your videos...'
          />
        </div>
        <button className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'>
          <Filter className='h-4 w-4 mr-2' />
          Filter
        </button>
      </div>

      {/* Stats Bar */}
      <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
        <span className='flex items-center gap-1'>
          <Video className='h-4 w-4' />
          {videos.length} videos
        </span>
        <span>•</span>
        <span>
          {videos
            .reduce(
              (acc, video) => acc + parseFloat(video.size.replace(' MB', '')),
              0
            )
            .toFixed(1)}{' '}
          MB total
        </span>
        <span>•</span>
        <span>{folders.length} folders</span>
      </div>

      {/* Folders */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Folders</h3>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          {folders.map(folder => (
            <div
              className='flex items-center gap-3 p-4 rounded-lg border bg-card text-card-foreground hover:bg-accent cursor-pointer transition-colors'
              key={folder.id}
            >
              <FolderOpen className='h-8 w-8 text-blue-500' />
              <div>
                <p className='font-medium'>{folder.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {folder.count} videos
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>All Videos</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {videos.map(video => (
            <div
              className='group rounded-lg border bg-card text-card-foreground overflow-hidden hover:shadow-lg transition-all duration-200'
              key={video.id}
            >
              {/* Video Thumbnail */}
              <div className='relative aspect-video bg-muted overflow-hidden'>
                <div className='w-full h-full bg-muted flex items-center justify-center'>
                  <Video className='h-12 w-12 text-muted-foreground' />
                </div>
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center'>
                  <Play className='h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                </div>
                <div className='absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs'>
                  {video.duration}
                </div>
                {video.status === VIDEO_STATUS_PROCESSING && (
                  <div className='absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs'>
                    Processing...
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className='p-4'>
                <h4 className='font-medium mb-2 line-clamp-2'>{video.title}</h4>
                <div className='space-y-2 text-sm text-muted-foreground'>
                  <div className='flex items-center justify-between'>
                    <span className='flex items-center gap-1'>
                      <Clock className='h-3 w-3' />
                      {video.createdAt}
                    </span>
                    <span>{video.size}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>{video.views} views</span>
                    <span className='uppercase text-xs'>{video.format}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex items-center justify-between p-4 pt-0'>
                <div className='flex items-center gap-2'>
                  <button className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8'>
                    <Play className='h-4 w-4' />
                  </button>
                  <button className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8'>
                    <Download className='h-4 w-4' />
                  </button>
                  <button className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8'>
                    <Share className='h-4 w-4' />
                  </button>
                </div>
                <button className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8'>
                  <MoreHorizontal className='h-4 w-4' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State for when no videos */}
      {videos.length === 0 && (
        <div className='text-center py-12'>
          <Video className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
          <h3 className='text-lg font-semibold mb-2'>No videos yet</h3>
          <p className='text-muted-foreground mb-4'>
            Your generated videos will appear here once they&apos;re ready.
          </p>
          <button className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>
            Generate Your First Video
          </button>
        </div>
      )}
    </div>
  );
}
