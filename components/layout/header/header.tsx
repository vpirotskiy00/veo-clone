import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  navigation?: { href: string; label: string }[];
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, title = 'Veo Clone', navigation = [], ...props }, ref) => {
    return (
      <header
        className={cn(
          'bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur',
          className
        )}
        ref={ref}
        {...props}
      >
        <div className='container flex h-14 items-center'>
          <div className='mr-4 hidden md:flex'>
            <Link className='mr-6 flex items-center space-x-2' href='/'>
              <span className='hidden font-bold sm:inline-block'>{title}</span>
            </Link>
            {navigation.length > 0 && (
              <nav className='flex items-center space-x-6 text-sm font-medium'>
                {navigation.map(item => (
                  <Link
                    className='hover:text-foreground/80 text-foreground/60 transition-colors'
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </header>
    );
  }
);
Header.displayName = 'Header';

export { Header };
