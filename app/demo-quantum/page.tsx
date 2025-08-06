import { HeroQuantum } from '@/components/hero-quantum/HeroQuantum';

export default function DemoQuantumPage() {
  return (
    <main className='min-h-screen'>
      <HeroQuantum />
      
      {/* Demo Info Section */}
      <section className='py-20 px-6 bg-slate-900'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-white mb-6'>
            Variant 1: Quantum Flow
          </h2>
          <div className='space-y-4 text-gray-300'>
            <p className='text-lg'>
              This variant features liquid morphing orbs with SVG filters, creating a fluid,
              organic animation system inspired by quantum mechanics.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
              <div className='bg-slate-800/50 rounded-lg p-6 backdrop-blur'>
                <h3 className='text-xl font-semibold text-white mb-3'>Key Features</h3>
                <ul className='space-y-2 text-sm'>
                  <li>• Liquid morphing orbs with physics</li>
                  <li>• Particle stream following cursor</li>
                  <li>• Wave propagation effects</li>
                  <li>• Liquid fill text animation</li>
                  <li>• Mouse parallax on all layers</li>
                </ul>
              </div>
              <div className='bg-slate-800/50 rounded-lg p-6 backdrop-blur'>
                <h3 className='text-xl font-semibold text-white mb-3'>Performance</h3>
                <ul className='space-y-2 text-sm'>
                  <li>• 60 FPS target framerate</li>
                  <li>• GPU-accelerated transforms</li>
                  <li>• Object pooling for particles</li>
                  <li>• Reduced motion support</li>
                  <li>• Optimized SVG filters</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}