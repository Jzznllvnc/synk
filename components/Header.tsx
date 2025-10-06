'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { signOut } from '@/lib/auth';
import toast from 'react-hot-toast';
import { Sun, Moon, Bell, User, LogOut, ChevronDown, PanelRightClose } from 'lucide-react';
import { useSidebar } from '@/lib/contexts/SidebarContext';
import { useLogout } from '@/lib/contexts/LogoutContext';
import Image from 'next/image';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const { user, profile } = useAuth();
  const router = useRouter();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { showLogoutLoading, hideLogoutLoading } = useLogout();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Example count
  const profileRef = useRef<HTMLDivElement>(null);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast.success(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode enabled`);
  };

  const handleLogoutClick = () => {
    setIsProfileOpen(false);
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Show loading screen first, then hide modal
      showLogoutLoading();
      setTimeout(() => setShowLogoutConfirm(false), 50);
      
      // Sign out in background
      await signOut();
      
      // Show loading for at least 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Hide loading and navigate
      hideLogoutLoading();
      router.push('/auth/login');
      router.refresh();
    } catch (error: any) {
      console.error('Logout error:', error);
      hideLogoutLoading();
      setShowLogoutConfirm(false);
      toast.error(error.message || 'Failed to sign out');
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleManageProfile = () => {
    setIsProfileOpen(false);
    // Navigate to profile page (you can create this later)
    toast('Profile management coming soon!');
  };

  const firstName = profile?.first_name || user?.user_metadata?.first_name || 'User';
  const lastName = profile?.last_name || user?.user_metadata?.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const email = profile?.email || user?.email || '';

  return (
    <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-40 mt-4">
      {/* Page Title and Subtitle with Collapse Button */}
      <div className="flex items-center space-x-4">
        {isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Expand sidebar"
          >
            <PanelRightClose className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>
      </div>

      {/* Right Section: Theme, Notification, Profile */}
      <div className="flex items-center space-x-3">
        {/* Theme Switcher Pill */}
        <button
          onClick={toggleTheme}
          className="flex items-center bg-gray-200 rounded-full p-2 gap-2.5 hover:bg-gray-200 transition-colors"
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <div className={`p-2 rounded-full transition-colors ${theme === 'light' ? 'bg-white shadow-sm' : ''}`}>
            <Sun className="w-4 h-4 text-gray-700" />
          </div>
          <div className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-white shadow-sm' : ''}`}>
            <Moon className="w-4 h-4 text-gray-700" />
          </div>
        </button>

        {/* Notifications Circle */}
        <button
          className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-200 transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-700" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        {/* Profile Pill */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-200 rounded-full pl-1.5 pr-4 py-2 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-medium relative">
              {firstName.charAt(0).toUpperCase()}
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="font-medium text-gray-900 text-sm">{firstName}</span>
            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Popover Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{fullName}</p>
                <p className="text-xs text-gray-500 truncate">{email}</p>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={handleManageProfile}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User className="w-4 h-4 mr-3 text-gray-500" />
                  Manage Profile
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div 
            className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full mx-6 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              {/* Logout Icon */}
              <div className="mb-6">
                <Image
                  src="/logout.svg"
                  alt="Logout"
                  width={150}
                  height={150}
                  className="w-40 h-40 mb-6"
                />
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Logout Confirmation
              </h3>
              
              {/* Message */}
              <p className="text-gray-600 mb-10 text-base">
                Are you sure you want to log out? You will need to login again to continue.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full">
                <button
                  type="button"
                  onClick={handleCancelLogout}
                  className="flex-1 px-5 py-2.5 bg-gray-100 border shadow-sm rounded-lg text-gray-700 font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  No, cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLogout}
                  className="flex-1 px-5 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Yes, logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

