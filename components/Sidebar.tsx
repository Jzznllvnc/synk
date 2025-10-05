'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Home,
  CheckCircle,
  FileText,
  Folder,
  Calendar,
  PanelRightOpen,
} from 'lucide-react';
import { useSidebar } from '@/lib/contexts/SidebarContext';
import Tooltip from '@/components/Tooltip';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Tasks', href: '/dashboard/tasks', icon: CheckCircle },
  { name: 'Notes', href: '/dashboard/notes', icon: FileText },
  { name: 'Files', href: '/dashboard/files', icon: Folder },
  { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <div className={`flex flex-col bg-white border-r border-gray-200 h-screen fixed transition-all duration-300 ${isCollapsed ? 'w-24' : 'w-64'}`}>
      {/* Logo */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} h-20 ${isCollapsed ? 'px-4' : 'px-6'} mt-4`}>
        <div className="flex items-center">
          <Image
            src="/Synk.svg"
            alt="Synk"
            width={48}
            height={48}
            className="h-12 w-12"
          />
          {!isCollapsed && (
            <span className="ml-3 text-3xl font-bold text-gray-900 whitespace-nowrap" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Synk</span>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            title="Collapse sidebar"
          >
            <PanelRightOpen className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 py-6 overflow-y-auto ${isCollapsed ? 'px-2 space-y-3' : 'px-4 space-y-1'}`}>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          
          if (isCollapsed) {
            return (
              <Tooltip key={item.name} content={item.name} position="right">
                <Link
                  href={item.href}
                  className={`
                    flex items-center justify-center py-3 text-sm font-medium rounded-lg transition-colors w-full
                    ${
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                </Link>
              </Tooltip>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

