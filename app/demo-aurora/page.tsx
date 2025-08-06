import { HeroAurora } from '@/components/hero-aurora/HeroAurora';

export default function DemoAuroraPage() {
  return (
    <main className='min-h-screen'>
      <HeroAurora />
      
      {/* Demo Info Section */}
      <section className='py-20 px-6 bg-slate-900 border-t border-emerald-900/30'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-white mb-6'>
            Variant 3: Aurora Symphony
          </h2>
          <div className='space-y-4 text-gray-300'>
            <p className='text-lg'>
              This variant creates a cosmic atmosphere with northern lights, 3D star fields,
              and breathing animations that evoke the serenity of deep space.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
              <div className='bg-emerald-900/10 border border-emerald-500/20 rounded-lg p-6'>
                <h3 className='text-xl font-semibold text-white mb-3'>Key Features</h3>
                <ul className='space-y-2 text-sm'>
                  <li>• SVG aurora wave animations</li>
                  <li>• 3D parallax star field</li>
                  <li>• Chromatic aberration text</li>
                  <li>• Breathing composition effect</li>
                  <li>• Shooting star animations</li>
                </ul>
              </div>
              <div className='bg-emerald-900/10 border border-emerald-500/20 rounded-lg p-6'>
                <h3 className='text-xl font-semibold text-white mb-3'>Performance</h3>
                <ul className='space-y-2 text-sm'>
                  <li>• CSS-based aurora waves</li>
                  <li>• Optimized star rendering</li>
                  <li>• Mix-blend-mode effects</li>
                  <li>• Smooth parallax scrolling</li>
                  <li>• Efficient color animations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}