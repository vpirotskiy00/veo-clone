import { HeroNeural } from '@/components/hero-neural/HeroNeural';

export default function DemoNeuralPage() {
  return (
    <main className='min-h-screen'>
      <HeroNeural />
      
      {/* Demo Info Section */}
      <section className='py-20 px-6 bg-black border-t border-purple-900/30'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-white mb-6'>
            Variant 2: Neural Pulse
          </h2>
          <div className='space-y-4 text-gray-300'>
            <p className='text-lg'>
              This variant features a dynamic neural network grid with electric pulses,
              glitch text effects, and cyberpunk-inspired aesthetics.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
              <div className='bg-purple-900/10 border border-purple-500/20 rounded-lg p-6'>
                <h3 className='text-xl font-semibold text-white mb-3'>Key Features</h3>
                <ul className='space-y-2 text-sm'>
                  <li>• Canvas-based neural network</li>
                  <li>• Electric pulse animations</li>
                  <li>• Glitch text effects</li>
                  <li>• Digital rain background</li>
                  <li>• Interactive node responses</li>
                </ul>
              </div>
              <div className='bg-purple-900/10 border border-purple-500/20 rounded-lg p-6'>
                <h3 className='text-xl font-semibold text-white mb-3'>Performance</h3>
                <ul className='space-y-2 text-sm'>
                  <li>• Canvas API optimization</li>
                  <li>• RequestAnimationFrame sync</li>
                  <li>• Dynamic quality adjustment</li>
                  <li>• Efficient node calculations</li>
                  <li>• GPU-accelerated rendering</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}