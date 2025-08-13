import { Check } from 'lucide-react';
import { Metadata } from 'next';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Pricing - Veo 3: AI Video Generation',
  description:
    'Choose the perfect plan for your AI video generation needs. Flexible pricing for creators and businesses.',
};

const pricingPlans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for content creators getting started',
    features: [
      '10 video generations per month',
      'Up to 30 seconds per video',
      'Basic sound effects',
      'Standard resolution (720p)',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$79',
    period: '/month',
    description: 'For professional creators and small teams',
    features: [
      '50 video generations per month',
      'Up to 2 minutes per video',
      'Advanced sound effects & dialogue',
      'High resolution (1080p)',
      'Priority support',
      'Commercial license',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large teams and organizations',
    features: [
      'Unlimited generations',
      'Custom video length',
      'Premium sound library',
      '4K resolution',
      'Dedicated support',
      'Custom integrations',
      'Advanced analytics',
    ],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <main className='min-h-screen pt-24'>
        <div className='container mx-auto px-6 py-12'>
          <div className='text-center mb-16'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Choose Your Plan
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              Start creating amazing videos with AI. Upgrade or downgrade at any
              time.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {pricingPlans.map(plan => (
              <Card
                className={`p-8 relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl scale-105' : ''}`}
                key={plan.name}
              >
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                    <span className='bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold'>
                      Most Popular
                    </span>
                  </div>
                )}

                <div className='text-center mb-8'>
                  <h3 className='text-2xl font-bold mb-2'>{plan.name}</h3>
                  <p className='text-gray-600 dark:text-gray-300 mb-4'>
                    {plan.description}
                  </p>
                  <div className='mb-4'>
                    <span className='text-4xl font-bold'>{plan.price}</span>
                    <span className='text-gray-600 dark:text-gray-300'>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className='space-y-4 mb-8'>
                  {plan.features.map((feature, index) => (
                    <li className='flex items-center' key={index}>
                      <Check className='w-5 h-5 text-green-500 mr-3' />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
