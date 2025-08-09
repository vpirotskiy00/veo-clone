import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/app-sidebar';
import { AuthSessionProvider } from '@/components/session-provider';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  const session = await auth();

  return (
    <AuthSessionProvider session={session}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 px-4 border-b'>
            <SidebarTrigger className='-ml-1' />
            <div className='flex items-center gap-2 px-4'>
              <h1 className='text-lg font-semibold'>Dashboard</h1>
            </div>
          </header>
          <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AuthSessionProvider>
  );
}
