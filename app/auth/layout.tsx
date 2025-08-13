import { Sparkles } from 'lucide-react';
import Link from 'next/link';

import { AuthSessionProvider } from '@/components/session-provider';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-[100dvh] flex'>
      {/* Left side - Branding */}
      <div className='hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 text-white relative overflow-hidden'>
        <div className='absolute inset-0 bg-black/20' />
        <div className='relative z-10 flex flex-col justify-between w-full max-w-md'>
          <div className='space-y-6'>
            <Link className='flex items-center space-x-3' href='/'>
              <div className='w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm'>
                <Sparkles className='w-6 h-6' />
              </div>
              <span className='text-2xl font-bold'>Veo 3</span>
            </Link>

            <div className='space-y-4'>
              <h1 className='text-4xl font-bold leading-tight'>
                Create Amazing Videos with AI
              </h1>
              <p className='text-xl text-white/80'>
                Transform your ideas into stunning videos with realistic sound,
                effects, and dialogue.
              </p>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='grid grid-cols-3 gap-4 text-center'>
              <div>
                <div className='text-2xl font-bold'>1M+</div>
                <div className='text-sm text-white/70'>Videos Created</div>
              </div>
              <div>
                <div className='text-2xl font-bold'>50K+</div>
                <div className='text-sm text-white/70'>Active Users</div>
              </div>
              <div>
                <div className='text-2xl font-bold'>98%</div>
                <div className='text-sm text-white/70'>Satisfaction</div>
              </div>
            </div>

            <blockquote className='border-l-4 border-white/30 pl-4'>
              <p className='text-white/90 italic'>
                &quot;Veo 3 transformed how I create content. The AI-generated
                sound effects are incredibly realistic!&quot;
              </p>
              <cite className='text-sm text-white/70 not-italic'>
                — Sarah Chen, Content Creator
              </cite>
            </blockquote>
          </div>
        </div>

        {/* Background decoration */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl' />
      </div>

      {/* Right side - Form */}
      <div className='flex-1 flex items-center justify-center p-8 pb-[calc(2rem+env(safe-area-inset-bottom))] bg-background'>
        <AuthSessionProvider session={null}>
          <div className='w-full max-w-md'>{children}</div>
        </AuthSessionProvider>
      </div>
    </div>
  );
}
