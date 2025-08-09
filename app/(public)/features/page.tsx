import { Metadata } from 'next';

import { FeaturesGrid } from '@/components/features-grid';
import { Navigation } from '@/components/navigation';

export const metadata: Metadata = {
  title: 'Features - Veo 3: AI Video Generation',
  description:
    'Explore the powerful features of Veo 3 AI video generation platform with realistic sound, effects, and dialogue.',
};

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main className='min-h-screen pt-24'>
        <div className='container mx-auto px-6 py-12'>
          <div className='text-center mb-16'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Powerful Features
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              Discover the cutting-edge capabilities that make Veo 3 the most
              advanced AI video generation platform
            </p>
          </div>

          <FeaturesGrid />
        </div>
      </main>
    </>
  );
}
