'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { SidebarProvider, useSidebar } from '@/lib/contexts/SidebarContext';
import LottieLoader from '@/components/LottieLoader';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // Get page title and subtitle based on current route
  const { title, subtitle } = useMemo(() => {
    const firstName = profile?.first_name || user?.user_metadata?.first_name || '';
    
    if (pathname === '/dashboard') {
      return {
        title: `Welcome back${firstName ? `, ${firstName}` : ''}! 🤘🏼`,
        subtitle: "Here's what's happening with your productivity."
      };
    } else if (pathname === '/dashboard/tasks') {
      return {
        title: 'Tasks',
        subtitle: 'Manage your to-do list and track progress'
      };
    } else if (pathname === '/dashboard/notes') {
      return {
        title: 'Notes',
        subtitle: 'Create and organize your notes with markdown'
      };
    } else if (pathname === '/dashboard/files') {
      return {
        title: 'Files',
        subtitle: 'Upload and manage your files securely'
      };
    } else if (pathname === '/dashboard/calendar') {
      return {
        title: 'Calendar',
        subtitle: 'Manage your events and schedule'
      };
    }
    
    return { title: 'Dashboard', subtitle: 'Welcome to Synk' };
  }, [pathname, profile, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LottieLoader size={280} text="" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-24' : 'ml-64'}`}>
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}

