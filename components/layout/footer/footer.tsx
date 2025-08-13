import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface FooterLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  links?: FooterLink[];
  copyright?: string;
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      links = [],
      copyright = `© ${new Date().getFullYear()} Veo Clone. All rights reserved.`,
      ...props
    },
    ref
  ) => {
    return (
      <footer
        className={cn(
          'bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t backdrop-blur',
          className
        )}
        ref={ref}
        {...props}
      >
        <div className='container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0'>
          {links.length > 0 && (
            <div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
              {links.map(link => (
                <Link
                  className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-center text-sm leading-loose transition-colors'
                  href={link.href}
                  key={link.href}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          <p className='text-muted-foreground text-center text-sm leading-loose md:text-left'>
            {copyright}
          </p>
        </div>
      </footer>
    );
  }
);
Footer.displayName = 'Footer';

export { Footer };
