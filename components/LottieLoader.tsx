'use client';

import Lottie from 'lottie-react';
import animationData from '@/public/Loading.json';

interface LottieLoaderProps {
  size?: number;
  text?: string;
  className?: string;
}

export default function LottieLoader({ 
  size = 200, 
  text = 'Loading...', 
  className = '' 
}: LottieLoaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <div style={{ width: size, height: size }} className="mx-auto">
        <Lottie 
          animationData={animationData} 
          loop={true}
          autoplay={true}
        />
      </div>
      {text && <p className="mt-2 font-bold loader-text">{text}</p>}
    </div>
  );
}

