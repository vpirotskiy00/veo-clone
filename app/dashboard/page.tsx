import { redirect } from 'next/navigation';

// Temporary redirect for demo - redirect /dashboard to the main dashboard
export default function DashboardRedirect() {
  redirect('/chat');
}
