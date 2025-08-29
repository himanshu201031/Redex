import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef, useEffect } from 'react';

const PageTransition = () => {
  const transitionRef = useRef();

  useGSAP(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Create smooth page transitions between sections
    const sections = [
      '#cocktail-gallery',
      '#reservation-system', 
      '#newsletter',
      '#contact'
    ];

    sections.forEach((section, index) => {
      const nextSection = sections[index + 1];
      
      if (nextSection) {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'section-transition-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #000000, #1a1a1a, #000000);
          z-index: 9999;
          pointer-events: none;
          opacity: 0;
        `;
        document.body.appendChild(overlay);

        ScrollTrigger.create({
          trigger: section,
          start: 'bottom center',
          end: 'bottom top',
          onEnter: () => {
            gsap.to(overlay, {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.inOut'
            });
          },
          onLeave: () => {
            gsap.to(overlay, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.inOut'
            });
          },
          onEnterBack: () => {
            gsap.to(overlay, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.inOut'
            });
          },
          onLeaveBack: () => {
            gsap.to(overlay, {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.inOut'
            });
          }
        });
      }
    });

    // Smooth scroll behavior
    gsap.to(window, {
      scrollBehavior: 'smooth'
    });

  }, []);

  return null; // This component doesn't render anything visible
};

export default PageTransition;
