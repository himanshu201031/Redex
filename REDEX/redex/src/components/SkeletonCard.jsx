import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const SkeletonCard = () => {
  const cardRef = useRef();

  useGSAP(() => {
    // Shimmer animation
    gsap.to('.skeleton-shimmer', {
      x: '100%',
      duration: 1.5,
      ease: 'power2.inOut',
      repeat: -1,
      stagger: 0.1
    });

    // Pulse animation for the whole card
    gsap.to(cardRef.current, {
      opacity: 0.7,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: 'power2.inOut'
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-black"
    >
      {/* Image Skeleton */}
      <div className="relative h-48 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer transform -translate-x-full"></div>
        <div className="w-full h-full bg-black/50"></div>

        {/* Badge Skeletons */}
        <div className="absolute top-3 right-3 w-16 h-6 bg-white/50 rounded-full"></div>
        <div className="absolute bottom-3 left-3 w-12 h-6 bg-white/50 rounded-full"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="relative overflow-hidden">
          <div className="h-6 bg-black/20 rounded w-3/4"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent skeleton-shimmer transform -translate-x-full"></div>
        </div>

        {/* Subtitle */}
        <div className="relative overflow-hidden">
          <div className="h-4 bg-black/20 rounded w-1/2"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent skeleton-shimmer transform -translate-x-full"></div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="relative overflow-hidden">
            <div className="h-3 bg-black/20 rounded w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent skeleton-shimmer transform -translate-x-full"></div>
          </div>
          <div className="relative overflow-hidden">
            <div className="h-3 bg-black/20 rounded w-4/5"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent skeleton-shimmer transform -translate-x-full"></div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="flex justify-between items-center">
          <div className="relative overflow-hidden">
            <div className="h-6 bg-black/20 rounded w-16"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent skeleton-shimmer transform -translate-x-full"></div>
          </div>
          <div className="relative overflow-hidden">
            <div className="h-6 bg-black/20 rounded w-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent skeleton-shimmer transform -translate-x-full"></div>
          </div>
        </div>

        {/* Button */}
        <div className="pt-3 border-t border-black">
          <div className="relative overflow-hidden">
            <div className="h-10 bg-black/30 rounded-lg w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent skeleton-shimmer transform -translate-x-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
