import { Slot } from '@radix-ui/react-slot';
import { cva,type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover active:bg-primary-active hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
        destructive:
          'bg-error text-error-foreground shadow-sm hover:bg-error/90 active:bg-error/80 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm focus-visible:ring-error/50',
        outline:
          'border border-border bg-background shadow-sm hover:bg-secondary-hover hover:border-border-hover active:bg-secondary-active text-foreground hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-hover active:bg-secondary-active hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
        ghost:
          'hover:bg-muted-hover hover:text-foreground active:bg-muted text-muted-foreground',
        link: 'text-primary underline-offset-4 hover:underline hover:text-primary-hover',
        success:
          'bg-success text-success-foreground shadow-sm hover:bg-success/90 active:bg-success/80 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
        warning:
          'bg-warning text-warning-foreground shadow-sm hover:bg-warning/90 active:bg-warning/80 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs',
        lg: 'h-11 rounded-md px-6 has-[>svg]:px-5 text-base',
        xl: 'h-12 rounded-lg px-8 has-[>svg]:px-7 text-lg',
        icon: 'size-9',
        iconSm: 'size-8',
        iconLg: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      data-slot='button'
      {...props}
    />
  );
}

export { Button, buttonVariants };
