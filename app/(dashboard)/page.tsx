import {
  BarChart,
  Clock,
  Library,
  Sparkles,
  TrendingUp,
  Upload,
  Video,
  Zap,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Dashboard - Veo 3',
  description: 'Your AI video generation dashboard',
};

// Mock data
const stats = [
  {
    title: 'Total Videos',
    value: '24',
    change: '+12%',
    trending: 'up',
    icon: Video,
  },
  {
    title: 'Generation Credits',
    value: '42',
    change: '-8 used',
    trending: 'down',
    icon: Zap,
  },
  {
    title: 'Total Watch Time',
    value: '2.4h',
    change: '+23%',
    trending: 'up',
    icon: Clock,
  },
  {
    title: 'Avg. Quality Score',
    value: '94%',
    change: '+2%',
    trending: 'up',
    icon: TrendingUp,
  },
];

const quickActions = [
  {
    title: 'Generate Video',
    description: 'Create a new AI-powered video',
    icon: Sparkles,
    href: '/dashboard/videos/generate',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
  },
  {
    title: 'Upload Content',
    description: 'Upload your own video files',
    icon: Upload,
    href: '/dashboard/videos/upload',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  },
  {
    title: 'Browse Library',
    description: 'Explore your video collection',
    icon: Library,
    href: '/dashboard/library',
    color: 'bg-gradient-to-br from-green-500 to-teal-500',
  },
  {
    title: 'View Analytics',
    description: 'See your usage statistics',
    icon: BarChart,
    href: '/dashboard/analytics',
    color: 'bg-gradient-to-br from-orange-500 to-red-500',
  },
];

const recentVideos = [
  {
    id: '1',
    title: 'Mountain Sunrise Timelapse',
    duration: '0:45',
    status: 'completed',
    thumbnail: '/api/placeholder/200/112',
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'City Street Scene',
    duration: '1:23',
    status: 'processing',
    thumbnail: '/api/placeholder/200/112',
    createdAt: '4 hours ago',
  },
  {
    id: '3',
    title: 'Ocean Waves Loop',
    duration: '0:30',
    status: 'completed',
    thumbnail: '/api/placeholder/200/112',
    createdAt: '1 day ago',
  },
];

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      {/* Welcome Section */}
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>
          Welcome back, Alex!
        </h1>
        <p className='text-muted-foreground'>
          Here&apos;s what&apos;s happening with your video generation projects.
        </p>
      </div>

      {/* Stats Grid */}
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

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Quick Actions */}
        <div className='lg:col-span-2 space-y-4'>
          <h2 className='text-xl font-semibold'>Quick Actions</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {quickActions.map(action => (
              <Card
                className='p-6 hover:shadow-md transition-shadow'
                key={action.title}
              >
                <Link className='block' href={action.href}>
                  <div className='flex items-start space-x-4'>
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className='h-6 w-6 text-white' />
                    </div>
                    <div className='flex-1 space-y-1'>
                      <h3 className='font-medium'>{action.title}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Videos */}
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Recent Videos</h2>
            <Button asChild size='sm' variant='outline'>
              <Link href='/dashboard/videos'>View all</Link>
            </Button>
          </div>
          <div className='space-y-3'>
            {recentVideos.map(video => (
              <Card className='p-4' key={video.id}>
                <div className='flex items-center space-x-3'>
                  <div className='w-16 h-9 bg-muted rounded-md flex items-center justify-center'>
                    <Video className='h-4 w-4 text-muted-foreground' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>
                      {video.title}
                    </p>
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
      </div>

      {/* Usage Summary */}
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
    </div>
  );
}
