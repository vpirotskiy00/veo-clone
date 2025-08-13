'use client';

import {
  BarChart,
  Bell,
  CreditCard,
  Home,
  Library,
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  Sparkles,
  User,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

// Menu items
const mainNavigation = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Chat',
    url: '/chat',
    icon: MessageSquare,
  },
  {
    title: 'Videos',
    url: '/videos',
    icon: Video,
  },
  {
    title: 'Library',
    url: '/library',
    icon: Library,
  },
  {
    title: 'Generate',
    url: '/videos/generate',
    icon: Sparkles,
    badge: 'New',
  },
];

const secondaryNavigation = [
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
  {
    title: 'Billing',
    url: '/billing',
    icon: CreditCard,
    badge: '3',
  },
];

// Mock user data
const user = {
  name: 'Alex Rivera',
  email: 'alex@veo3.ai',
  avatar: '/avatars/alex.jpg',
  plan: 'Pro Plan',
  credits: 42,
};

function WorkspaceDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
          size='lg'
        >
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-sidebar-primary-foreground'>
            <Sparkles className='size-4' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>Veo 3</span>
            <span className='truncate text-xs'>AI Video Studio</span>
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
        side='bottom'
        sideOffset={4}
      >
        <DropdownMenuLabel className='text-xs text-muted-foreground'>
          Workspaces
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <div className='flex aspect-square size-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-600 text-white'>
            <Sparkles className='size-3' />
          </div>
          <span>Personal</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className='flex aspect-square size-6 items-center justify-center rounded-md bg-gradient-to-br from-green-500 to-teal-600 text-white'>
            <Video className='size-3' />
          </div>
          <span>Team Pro</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className='flex aspect-square size-6 items-center justify-center rounded-md border bg-background'>
            <Plus className='size-3' />
          </div>
          <span>Add workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavigationSection({ pathname }: { pathname: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {mainNavigation.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.badge && (
                <SidebarMenuBadge
                  className={cn(
                    item.badge === 'New' && 'bg-green-500 text-white',
                    item.badge === 'Beta' && 'bg-blue-500 text-white',
                    typeof item.badge === 'string' &&
                      !['New', 'Beta'].includes(item.badge) &&
                      'bg-muted text-muted-foreground'
                  )}
                >
                  {item.badge}
                </SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function WorkspaceSection({ pathname }: { pathname: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarGroupAction title='Quick Actions'>
        <Plus />
        <span className='sr-only'>Quick Actions</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {secondaryNavigation.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function CreditsSection() {
  const creditsProgressStyle = useMemo(
    () => ({
      width: `${Math.min((user.credits / 100) * 100, 100)}%`,
    }),
    []
  );

  return (
    <SidebarGroup className='mt-auto'>
      <SidebarGroupContent>
        <div className='px-2 py-2 text-xs text-muted-foreground'>
          <div className='font-medium mb-1'>Generation Credits</div>
          <div className='flex items-center justify-between'>
            <span>{user.credits} remaining</span>
            <Button className='h-auto p-1 text-xs' size='sm' variant='ghost'>
              Buy more
            </Button>
          </div>
          <div className='mt-2 h-1 bg-muted rounded-full overflow-hidden'>
            <div
              className='h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300'
              style={creditsProgressStyle}
            />
          </div>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function UserMenu() {
  const userInitials = useMemo(
    () =>
      user.name
        .split(' ')
        .map(n => n[0])
        .join(''),
    []
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
          size='lg'
        >
          <Avatar className='h-8 w-8 rounded-lg'>
            <div className='flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm'>
              {userInitials}
            </div>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>{user.name}</span>
            <span className='truncate text-xs'>{user.plan}</span>
          </div>
          <Bell className='ml-auto size-4' />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
        side='bottom'
        sideOffset={4}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            <Avatar className='h-8 w-8 rounded-lg'>
              <div className='flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm'>
                {userInitials}
              </div>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>{user.name}</span>
              <span className='truncate text-xs'>{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className='size-4 mr-2' />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className='size-4 mr-2' />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className='size-4 mr-2' />
          Notifications
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className='size-4 mr-2' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <WorkspaceDropdown />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavigationSection pathname={pathname} />
        <SidebarSeparator />
        <WorkspaceSection pathname={pathname} />
        <SidebarSeparator />
        <CreditsSection />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
