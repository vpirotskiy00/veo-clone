import { BarChart3, Clock, Eye, TrendingUp, Users, Video } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics - Veo 3',
  description: 'View detailed analytics and insights for your video content',
};

// Mock analytics data
const analyticsStats = [
  {
    title: 'Total Views',
    value: '12.4K',
    change: '+18%',
    trending: 'up' as const,
    icon: Eye,
  },
  {
    title: 'Watch Time',
    value: '48.2h',
    change: '+23%',
    trending: 'up' as const,
    icon: Clock,
  },
  {
    title: 'Active Videos',
    value: '24',
    change: '+3',
    trending: 'up' as const,
    icon: Video,
  },
  {
    title: 'Engagement Rate',
    value: '94%',
    change: '+5%',
    trending: 'up' as const,
    icon: TrendingUp,
  },
];

const topVideos = [
  {
    id: '1',
    title: 'Mountain Sunrise Timelapse',
    views: '2.1K',
    duration: '0:45',
    engagement: '96%',
  },
  {
    id: '2',
    title: 'City Street Scene',
    views: '1.8K',
    duration: '1:23',
    engagement: '92%',
  },
  {
    id: '3',
    title: 'Ocean Waves Loop',
    views: '1.5K',
    duration: '0:30',
    engagement: '94%',
  },
];

export default function AnalyticsPage() {
  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>Analytics</h1>
        <p className='text-muted-foreground'>
          Track your video performance and audience engagement.
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {analyticsStats.map((stat, index) => (
          <div
            className='rounded-lg border bg-card text-card-foreground p-6'
            key={index}
          >
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>
                  {stat.title}
                </p>
                <p className='text-2xl font-bold'>{stat.value}</p>
              </div>
              <stat.icon className='h-4 w-4 text-muted-foreground' />
            </div>
            <div className='flex items-center pt-2'>
              <span
                className={`text-sm font-medium ${
                  stat.trending === 'up'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
              </span>
              <span className='text-sm text-muted-foreground ml-1'>
                from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Top Performing Videos */}
        <div className='rounded-lg border bg-card text-card-foreground'>
          <div className='p-6 pb-4'>
            <div className='flex items-center gap-2'>
              <BarChart3 className='h-5 w-5' />
              <h3 className='text-lg font-semibold'>Top Performing Videos</h3>
            </div>
          </div>
          <div className='p-6 pt-0 space-y-4'>
            {topVideos.map(video => (
              <div
                className='flex items-center justify-between p-4 rounded-lg bg-muted/50'
                key={video.id}
              >
                <div className='space-y-1'>
                  <p className='font-medium'>{video.title}</p>
                  <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                    <span className='flex items-center gap-1'>
                      <Eye className='h-3 w-3' />
                      {video.views} views
                    </span>
                    <span className='flex items-center gap-1'>
                      <Clock className='h-3 w-3' />
                      {video.duration}
                    </span>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-sm font-medium text-green-600 dark:text-green-400'>
                    {video.engagement}
                  </p>
                  <p className='text-xs text-muted-foreground'>engagement</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className='rounded-lg border bg-card text-card-foreground'>
          <div className='p-6 pb-4'>
            <div className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5' />
              <h3 className='text-lg font-semibold'>Performance Overview</h3>
            </div>
          </div>
          <div className='p-6 pt-0'>
            <div className='h-64 rounded-lg bg-muted/50 flex items-center justify-center'>
              <div className='text-center space-y-2'>
                <BarChart3 className='h-12 w-12 text-muted-foreground mx-auto' />
                <p className='text-sm text-muted-foreground'>
                  Chart visualization coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Analytics Sections */}
      <div className='rounded-lg border bg-card text-card-foreground p-6'>
        <div className='flex items-center gap-2 mb-4'>
          <Users className='h-5 w-5' />
          <h3 className='text-lg font-semibold'>Audience Insights</h3>
        </div>
        <div className='text-center py-8'>
          <Users className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
          <p className='text-muted-foreground'>
            Detailed audience analytics and demographics will be available here.
          </p>
        </div>
      </div>
    </div>
  );
}
