import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Card } from '@/components/ui/card';

interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className='lg:col-span-2 space-y-4'>
      <h2 className='text-xl font-semibold'>Quick Actions</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {actions.map(action => (
          <Card
            className='p-6 hover:shadow-md transition-shadow'
            key={action.title}
          >
            <Link className='block' href={action.href}>
              <div className='flex items-start space-x-4'>
                <div className={`p-3 rounded-lg ${action.color}`}>
                  <action.icon className='h-6 w-6 text-white' />
                </div>
                <div className='flex-1 space-y-1'>
                  <h3 className='font-medium'>{action.title}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}