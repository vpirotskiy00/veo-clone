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

import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentVideos } from '@/components/dashboard/RecentVideos';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { UsageSummary } from '@/components/dashboard/UsageSummary';

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

      <StatsGrid stats={stats} />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <QuickActions actions={quickActions} />
        <RecentVideos videos={recentVideos} />
      </div>

      <UsageSummary />
    </div>
  );
}
