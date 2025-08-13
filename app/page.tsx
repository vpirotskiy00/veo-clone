import { FeaturesGrid } from '@/components/features-grid';
import { HeroSection } from '@/components/hero-section';
import { HowItWorks } from '@/components/how-it-works';
import { Navigation } from '@/components/navigation';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Navigation />
      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
    </main>
  );
}
