import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect, useState } from 'react';

const ScrollProgress = () => {
  const progressRef = useRef();
  const circleRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useGSAP(() => {
    // Animate progress bar
    gsap.to(progressRef.current, {
      scaleX: scrollProgress / 100,
      duration: 0.1,
      ease: 'none'
    });

    // Animate circle progress
    const circumference = 2 * Math.PI * 20; // radius = 20
    const offset = circumference - (scrollProgress / 100) * circumference;
    
    gsap.to(circleRef.current, {
      strokeDashoffset: offset,
      duration: 0.1,
      ease: 'none'
    });

    // Show/hide based on scroll position
    gsap.to('.scroll-progress-container', {
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : 20,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, [scrollProgress, isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setIsVisible(scrollTop > 100); // Show after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.5,
      ease: 'power2.inOut'
    });
  };

  return (
    <>
      {/* Linear Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-amber-200/30 z-50">
        <div 
          ref={progressRef}
          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 origin-left transform scale-x-0"
        />
      </div>

      {/* Circular Progress with Scroll to Top */}
      <div className="scroll-progress-container fixed bottom-8 right-8 z-50 opacity-0">
        <button
          onClick={scrollToTop}
          className="relative w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          {/* Progress Circle */}
          <svg className="absolute inset-0 w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="20"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="3"
              fill="none"
            />
            <circle
              ref={circleRef}
              cx="32"
              cy="32"
              r="20"
              stroke="white"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20}`}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Arrow Icon */}
          <div className="text-white text-xl font-bold group-hover:animate-bounce">
            ↑
          </div>
          
          {/* Percentage Text */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {Math.round(scrollProgress)}%
          </div>
        </button>
      </div>
    </>
  );
};

export default ScrollProgress;
