import {
  Calendar,
  Check,
  CreditCard,
  Download,
  Package,
  Receipt,
  Star,
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billing - Veo 3',
  description: 'Manage your subscription and billing information',
};

// Mock billing data
const currentPlan = {
  name: 'Pro Plan',
  price: '$29',
  period: '/month',
  description: 'Perfect for content creators and small teams',
  features: [
    '100 video generations per month',
    'HD quality exports',
    'Priority processing',
    'Advanced editing tools',
    'Email support',
  ],
  usage: {
    generated: 42,
    limit: 100,
  },
};

const plans = [
  {
    name: 'Starter',
    price: '$9',
    period: '/month',
    description: 'Great for getting started',
    features: [
      '20 video generations per month',
      'Standard quality exports',
      'Basic editing tools',
      'Community support',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Perfect for content creators',
    features: [
      '100 video generations per month',
      'HD quality exports',
      'Priority processing',
      'Advanced editing tools',
      'Email support',
    ],
    popular: true,
  },
  {
    name: 'Team',
    price: '$79',
    period: '/month',
    description: 'For teams and agencies',
    features: [
      'Unlimited video generations',
      '4K quality exports',
      'Fastest processing',
      'Team collaboration',
      'Priority support',
      'Custom branding',
    ],
    popular: false,
  },
];

const invoices = [
  {
    id: 'INV-2024-001',
    date: '2024-02-01',
    amount: '$29.00',
    status: 'paid',
    period: 'Feb 2024',
  },
  {
    id: 'INV-2024-002',
    date: '2024-01-01',
    amount: '$29.00',
    status: 'paid',
    period: 'Jan 2024',
  },
  {
    id: 'INV-2023-012',
    date: '2023-12-01',
    amount: '$29.00',
    status: 'paid',
    period: 'Dec 2023',
  },
];

export default function BillingPage() {
  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>Billing</h1>
        <p className='text-muted-foreground'>
          Manage your subscription, billing, and usage.
        </p>
      </div>

      {/* Current Plan & Usage */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
          {/* Current Plan */}
          <div className='rounded-lg border bg-card text-card-foreground p-6'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                <Package className='h-5 w-5' />
                <h3 className='text-lg font-semibold'>Current Plan</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                <span className='text-sm font-medium'>{currentPlan.name}</span>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-baseline gap-1'>
                <span className='text-3xl font-bold'>{currentPlan.price}</span>
                <span className='text-muted-foreground'>
                  {currentPlan.period}
                </span>
              </div>
              <p className='text-muted-foreground'>{currentPlan.description}</p>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Usage this month</span>
                  <span>
                    {currentPlan.usage.generated} / {currentPlan.usage.limit}{' '}
                    videos
                  </span>
                </div>
                <div className='w-full bg-muted rounded-full h-2'>
                  <div
                    className='bg-primary h-2 rounded-full'
                    style={{
                      width: `${(currentPlan.usage.generated / currentPlan.usage.limit) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className='flex gap-2 pt-2'>
                <button className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>
                  Upgrade Plan
                </button>
                <button className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'>
                  Manage
                </button>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className='rounded-lg border bg-card text-card-foreground p-6'>
            <div className='flex items-center gap-2 mb-4'>
              <CreditCard className='h-5 w-5' />
              <h3 className='text-lg font-semibold'>Payment Method</h3>
            </div>
            <div className='flex items-center justify-between p-4 rounded-lg bg-muted/50'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded'></div>
                <div>
                  <p className='font-medium'>•••• •••• •••• 4242</p>
                  <p className='text-sm text-muted-foreground'>Expires 12/26</p>
                </div>
              </div>
              <button className='text-sm font-medium text-primary hover:underline'>
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className='rounded-lg border bg-card text-card-foreground p-6'>
          <div className='flex items-center gap-2 mb-4'>
            <Receipt className='h-5 w-5' />
            <h3 className='text-lg font-semibold'>Recent Invoices</h3>
          </div>
          <div className='space-y-3'>
            {invoices.map(invoice => (
              <div
                className='flex items-center justify-between p-3 rounded-lg bg-muted/50'
                key={invoice.id}
              >
                <div>
                  <p className='font-medium'>{invoice.period}</p>
                  <p className='text-sm text-muted-foreground'>
                    {invoice.date}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>{invoice.amount}</p>
                  <div className='flex items-center gap-1'>
                    <Check className='h-3 w-3 text-green-600' />
                    <span className='text-xs text-green-600'>Paid</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className='w-full mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'>
            <Download className='h-4 w-4 mr-2' />
            Download All
          </button>
        </div>
      </div>

      {/* Available Plans */}
      <div className='space-y-4'>
        <h3 className='text-xl font-semibold'>Available Plans</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {plans.map((plan, index) => (
            <div
              className={`rounded-lg border bg-card text-card-foreground p-6 relative ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}
              key={index}
            >
              {plan.popular && (
                <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                  <span className='bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium'>
                    Most Popular
                  </span>
                </div>
              )}
              <div className='text-center mb-6'>
                <h4 className='text-lg font-semibold mb-2'>{plan.name}</h4>
                <div className='flex items-baseline justify-center gap-1 mb-2'>
                  <span className='text-3xl font-bold'>{plan.price}</span>
                  <span className='text-muted-foreground'>{plan.period}</span>
                </div>
                <p className='text-sm text-muted-foreground'>
                  {plan.description}
                </p>
              </div>
              <ul className='space-y-3 mb-6'>
                {plan.features.map((feature, featureIndex) => (
                  <li className='flex items-center gap-2' key={featureIndex}>
                    <Check className='h-4 w-4 text-green-600' />
                    <span className='text-sm'>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {plan.name === currentPlan.name
                  ? 'Current Plan'
                  : `Upgrade to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Next Billing Date */}
      <div className='rounded-lg border bg-card text-card-foreground p-6'>
        <div className='flex items-center gap-2 mb-2'>
          <Calendar className='h-5 w-5' />
          <h3 className='text-lg font-semibold'>Next Billing Date</h3>
        </div>
        <p className='text-muted-foreground'>
          Your next billing date is <strong>March 1, 2024</strong>. You will be
          charged <strong>$29.00</strong> for your Pro Plan subscription.
        </p>
      </div>
    </div>
  );
}
