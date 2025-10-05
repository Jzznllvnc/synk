'use client';

import toast, { Toaster, resolveValue, ToastIcon } from 'react-hot-toast';
import { X } from 'lucide-react';

// Custom Info Icon SVG (solid circle with i)
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="10" fill="#6b7280"/>
    <path d="M10 14V9M10 6H10.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options
        duration: 3000,
        style: {
          background: '#fff',
          color: '#374151',
          padding: '20px 26px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          maxWidth: '600px',
          minHeight: '56px',
        },
        // Success
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        },
        // Error
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
        // Loading
        loading: {
          iconTheme: {
            primary: '#3b82f6',
            secondary: '#fff',
          },
        },
        // Default/Blank
        blank: {
          icon: <InfoIcon />,
        },
      }}
    >
      {(t) => (
        <div
          style={{
            ...t.style,
            opacity: t.visible ? 1 : 0,
            transform: t.visible ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'all 0.3s ease-out',
          }}
          className="flex items-center justify-between gap-3"
        >
          {/* Icon with larger size */}
          <div className="flex-shrink-0 scale-125 mr-2">
            <ToastIcon toast={t} />
          </div>
          
          {/* Message */}
          <span className="flex-1 mr-4">{resolveValue(t.message, t)}</span>
          
          {/* Close Button - Only for success and error */}
          {(t.type === 'success' || t.type === 'error') && (
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </Toaster>
  );
}

