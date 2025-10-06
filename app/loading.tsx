import LottieLoader from '@/components/LottieLoader';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LottieLoader size={280} text="Loading..." />
    </div>
  );
}

