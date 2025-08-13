'use client';

import { Slot } from '@radix-ui/react-slot';
import { PanelLeftIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

import { useSidebar } from './context';

const SIDEBAR_WIDTH_MOBILE = '18rem';

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        className={cn(
          'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
          className
        )}
        data-slot='sidebar'
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet onOpenChange={setOpenMobile} open={openMobile} {...props}>
        <SheetContent
          className='bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden'
          data-mobile='true'
          data-sidebar='sidebar'
          data-slot='sidebar'
          side={side}
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
        >
          <SheetHeader className='sr-only'>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className='flex h-full w-full flex-col'>{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className='group peer text-sidebar-foreground hidden md:block'
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-side={side}
      data-slot='sidebar'
      data-state={state}
      data-variant={variant}
    >
      <div
        className={cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
        )}
        data-slot='sidebar-gap'
      />
      <div
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        data-slot='sidebar-container'
        {...props}
      >
        <div
          className='bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm'
          data-sidebar='sidebar'
          data-slot='sidebar-inner'
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      className={cn('size-7', className)}
      data-sidebar='trigger'
      data-slot='sidebar-trigger'
      onClick={event => {
        onClick?.(event);
        toggleSidebar();
      }}
      size='icon'
      variant='ghost'
      {...props}
    >
      <PanelLeftIcon />
      <span className='sr-only'>Toggle Sidebar</span>
    </Button>
  );
}

function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      aria-label='Toggle Sidebar'
      className={cn(
        'hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className
      )}
      data-sidebar='rail'
      data-slot='sidebar-rail'
      onClick={toggleSidebar}
      tabIndex={-1}
      title='Toggle Sidebar'
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      className={cn(
        'bg-background relative flex w-full flex-1 flex-col',
        'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
        className
      )}
      data-slot='sidebar-inset'
      {...props}
    />
  );
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      className={cn('bg-background h-8 w-full shadow-none', className)}
      data-sidebar='input'
      data-slot='sidebar-input'
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-2 p-2', className)}
      data-sidebar='header'
      data-slot='sidebar-header'
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-2 p-2', className)}
      data-sidebar='footer'
      data-slot='sidebar-footer'
      {...props}
    />
  );
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      data-sidebar='separator'
      data-slot='sidebar-separator'
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className
      )}
      data-sidebar='content'
      data-slot='sidebar-content'
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      data-sidebar='group'
      data-slot='sidebar-group'
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn(
        'text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className
      )}
      data-sidebar='group-label'
      data-slot='sidebar-group-label'
      {...props}
    />
  );
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'after:absolute after:-inset-2 md:after:hidden',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      data-sidebar='group-action'
      data-slot='sidebar-group-action'
      {...props}
    />
  );
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('w-full text-sm', className)}
      data-sidebar='group-content'
      data-slot='sidebar-group-content'
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
};
