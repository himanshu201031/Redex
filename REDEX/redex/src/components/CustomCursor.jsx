import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef();
  const cursorDotRef = useRef();
  const cursorTextRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useGSAP(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorText = cursorTextRef.current;

    if (!cursor || !cursorDot || !cursorText) return;

    // Hide default cursor and show custom cursor
    document.body.style.cursor = 'none';
    setIsVisible(true);

    // Set initial position
    gsap.set([cursor, cursorDot], {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 1
    });

    console.log('Custom cursor initialized');

    // Mouse move handler
    const handleMouseMove = (e) => {
      if (!cursor || !cursorDot) return;

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out'
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power2.out'
      });
    };

    // Simplified color detection function
    const getElementBrightness = (element) => {
      // Check for light colored elements
      if (element.matches('.glass-card, .contact-card, .gradient-bg, .bg-white, .parallax-container, .parallax-image') ||
          element.closest('.glass-card, .contact-card, .gradient-bg, .bg-white, .parallax-container')) {
        return 'light';
      }
      return 'dark';
    };

    // Simplified mouse enter handler
    const handleMouseEnter = (e) => {
      const target = e.target;
      if (!cursor || !cursorDot || !cursorText) return;

      const brightness = getElementBrightness(target);
      const isLight = brightness === 'light';

      const solidColor = isLight ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)';
      const dotColor = isLight ? '#000000' : '#ffffff';
      const textColor = isLight ? '#000000' : '#ffffff';
      const borderColor = isLight ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';

      if (target.matches('button, a, .contact-card, .cocktail-card, .social-icon, .parallax-container, .parallax-image')) {
        // Interactive cursor
        gsap.to(cursor, {
          scale: 2,
          backgroundColor: solidColor,
          borderColor: borderColor,
          duration: 0.3,
          ease: 'power2.out'
        });

        gsap.to(cursorDot, {
          scale: 0,
          duration: 0.2,
          ease: 'power2.out'
        });

        // Update cursor text
        cursorText.style.color = textColor;
        let text = '';
        if (target.matches('button')) text = 'CLICK';
        else if (target.matches('a')) text = 'VISIT';
        else if (target.matches('.cocktail-card')) text = 'VIEW';
        else if (target.matches('.parallax-container, .parallax-image')) text = 'EXPLORE';
        else if (target.matches('.contact-card')) text = 'CONNECT';
        else if (target.matches('.social-icon')) text = 'FOLLOW';

        if (text) {
          cursorText.textContent = text;
          gsap.to(cursorText, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      } else {
        // Regular cursor
        gsap.to(cursor, {
          scale: 1.2,
          backgroundColor: solidColor,
          borderColor: borderColor,
          duration: 0.3,
          ease: 'power2.out'
        });

        gsap.to(cursorDot, {
          backgroundColor: dotColor,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      if (!cursor || !cursorDot || !cursorText) return;

      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(cursorDot, {
        scale: 1,
        backgroundColor: '#ffffff',
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(cursorText, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Mouse down/up handlers
    const handleMouseDown = () => {
      if (!cursor || !cursorDot) return;
      gsap.to([cursor, cursorDot], {
        scale: 0.8,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const handleMouseUp = () => {
      if (!cursor || !cursorDot) return;
      gsap.to([cursor, cursorDot], {
        scale: 1,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
      setIsVisible(false);
    };
  }, []);

  // Only render on desktop
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 10000
        }}
      >
        {/* Cursor text */}
        <div
          ref={cursorTextRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold opacity-0 whitespace-nowrap"
          style={{
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
            letterSpacing: '0.5px'
          }}
        />
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '4px',
          height: '4px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 10001
        }}
      />
    </>
  );
};

export default CustomCursor;
