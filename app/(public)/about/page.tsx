import { Award, Lightbulb, Target, Users } from 'lucide-react';
import { Metadata } from 'next';

import { Navigation } from '@/components/navigation';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About - Veo 3: AI Video Generation',
  description:
    'Learn about Veo 3 and our mission to revolutionize video creation with AI-powered technology.',
};

const values = [
  {
    icon: Target,
    title: 'Innovation',
    description:
      'We push the boundaries of AI technology to create groundbreaking video generation tools.',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'We build tools that empower creators, artists, and businesses to tell their stories.',
  },
  {
    icon: Lightbulb,
    title: 'Simplicity',
    description:
      'Complex AI made simple - our tools are designed for creators, not just engineers.',
  },
  {
    icon: Award,
    title: 'Quality',
    description:
      'We never compromise on the quality of generated videos, sound, and user experience.',
  },
];

const team = [
  {
    name: 'Alex Rivera',
    role: 'CEO & Co-founder',
    description:
      'Former ML engineer at DeepMind with 10+ years in AI research.',
  },
  {
    name: 'Sarah Chen',
    role: 'CTO & Co-founder',
    description:
      'Computer vision expert with PhD from Stanford, previously at NVIDIA.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Head of Product',
    description:
      'Product leader with experience at Adobe and Figma, passionate about creator tools.',
  },
];

function HeroSection() {
  return (
    <div className='text-center mb-16'>
      <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
        About Veo 3
      </h1>
      <p className='text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed'>
        We&apos;re on a mission to democratize video creation by making
        AI-powered video generation accessible to everyone. From individual
        creators to large enterprises, we provide the tools to bring any vision
        to life with unprecedented realism and quality.
      </p>
    </div>
  );
}

function MissionSection() {
  return (
    <div className='mb-16'>
      <Card className='p-8 md:p-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20'>
        <h2 className='text-3xl font-bold mb-6 text-center'>Our Mission</h2>
        <p className='text-lg text-center max-w-3xl mx-auto leading-relaxed'>
          To empower creators worldwide with AI technology that transforms
          imagination into reality. We believe that everyone should have access
          to professional-quality video creation tools, regardless of technical
          expertise or budget constraints.
        </p>
      </Card>
    </div>
  );
}

function ValuesSection() {
  return (
    <div className='mb-16'>
      <h2 className='text-3xl font-bold text-center mb-12'>Our Values</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {values.map(value => (
          <Card className='p-6 text-center h-full' key={value.title}>
            <value.icon className='w-12 h-12 mx-auto mb-4 text-blue-600' />
            <h3 className='text-xl font-semibold mb-3'>{value.title}</h3>
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
              {value.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TeamSection() {
  return (
    <div className='mb-16'>
      <h2 className='text-3xl font-bold text-center mb-12'>Meet Our Team</h2>
      <div className='grid md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
        {team.map(member => (
          <Card className='p-6 text-center' key={member.name}>
            <div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold'>
              {member.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </div>
            <h3 className='text-xl font-semibold mb-2'>{member.name}</h3>
            <p className='text-blue-600 dark:text-blue-400 font-medium mb-3'>
              {member.role}
            </p>
            <p className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed'>
              {member.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatsSection() {
  return (
    <div className='text-center'>
      <Card className='p-8 md:p-12'>
        <h2 className='text-3xl font-bold mb-8'>Our Impact</h2>
        <div className='grid md:grid-cols-3 gap-8'>
          <div>
            <div className='text-4xl font-bold text-blue-600 mb-2'>1M+</div>
            <p className='text-gray-600 dark:text-gray-300'>Videos Generated</p>
          </div>
          <div>
            <div className='text-4xl font-bold text-purple-600 mb-2'>50K+</div>
            <p className='text-gray-600 dark:text-gray-300'>Active Creators</p>
          </div>
          <div>
            <div className='text-4xl font-bold text-green-600 mb-2'>150+</div>
            <p className='text-gray-600 dark:text-gray-300'>Countries Served</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className='min-h-[100dvh] pt-24'>
        <div className='container mx-auto px-6 py-12'>
          <HeroSection />
          <MissionSection />
          <ValuesSection />
          <TeamSection />
          <StatsSection />
        </div>
      </main>
    </>
  );
}
