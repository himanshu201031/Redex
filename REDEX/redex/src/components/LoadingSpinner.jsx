import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'amber' }) => {
  const spinnerRef = useRef();
  const dotsRef = useRef();

  useGSAP(() => {
    // Rotate the main spinner
    gsap.to(spinnerRef.current, {
      rotation: 360,
      duration: 2,
      ease: 'none',
      repeat: -1
    });

    // Animate the dots
    gsap.to('.loading-dot', {
      scale: 1.5,
      opacity: 0.5,
      duration: 0.6,
      stagger: 0.2,
      yoyo: true,
      repeat: -1,
      ease: 'power2.inOut'
    });
  }, []);

  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-20 h-20'
  };

  const colorClasses = {
    amber: 'border-amber-500',
    orange: 'border-orange-500',
    red: 'border-red-500',
    green: 'border-green-500'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Spinning Circle */}
      <div 
        ref={spinnerRef}
        className={`${sizeClasses[size]} border-4 ${colorClasses[color]} border-t-transparent rounded-full`}
      />
      
      {/* Loading Dots */}
      <div ref={dotsRef} className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`loading-dot w-2 h-2 bg-${color}-500 rounded-full`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
