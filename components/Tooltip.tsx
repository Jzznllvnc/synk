'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export default function Tooltip({ 
  content, 
  children, 
  position = 'right',
  delay = 200 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        let top = 0;
        let left = 0;

        switch (position) {
          case 'top':
            top = rect.top - 8;
            left = rect.left + rect.width / 2;
            break;
          case 'bottom':
            top = rect.bottom + 8;
            left = rect.left + rect.width / 2;
            break;
          case 'left':
            top = rect.top + rect.height / 2;
            left = rect.left - 8;
            break;
          case 'right':
            // For right position, find the SVG icon for accurate positioning
            const svgElement = targetRef.current.querySelector('svg');
            if (svgElement) {
              const svgRect = svgElement.getBoundingClientRect();
              // Center of the icon
              top = svgRect.top + (svgRect.height / 2) -12;
            } else {
              top = rect.top + (rect.height / 2);
            }
            left = rect.right + 12;
            break;
        }

        setCoords({ top, left });
        setIsVisible(true);
      }
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <>
      <div
        ref={targetRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            transform: position === 'top' 
              ? 'translate(-50%, -100%)' 
              : position === 'bottom'
              ? 'translate(-50%, 0)'
              : position === 'left'
              ? 'translate(-100%, -50%)'
              : 'translate(0, -50%)',
          }}
        >
          <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap flex items-center">
            {content}
            {/* Arrow */}
            <div
              className="absolute w-2 h-2 bg-gray-900 transform rotate-45"
              style={{
                [position === 'top' ? 'bottom' : position === 'bottom' ? 'top' : position === 'left' ? 'right' : 'left']: '-4px',
                [position === 'top' || position === 'bottom' ? 'left' : 'top']: '50%',
                [position === 'top' || position === 'bottom' ? 'marginLeft' : 'marginTop']: '-4px',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

