import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

const SectionTransitions = () => {
  const transitionsRef = useRef();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Define sections in order
    const sections = [
      { id: '#cocktail-gallery', name: 'Our Signature Collection' },
      { id: '#reservation-system', name: 'Reserve Your Table' },
      { id: '#newsletter', name: 'Stay in the Mix' },
      { id: '#contact', name: 'Where to Find Us' }
    ];

    sections.forEach((section, index) => {
      const sectionElement = document.querySelector(section.id);
      if (!sectionElement) return;

      // Add section transition overlay
      const overlay = document.createElement('div');
      overlay.className = `section-overlay section-overlay-${index}`;
      overlay.innerHTML = `
        <div class="transition-content">
          <div class="transition-line"></div>
          <h3 class="transition-title">${section.name}</h3>
          <div class="transition-line"></div>
        </div>
      `;
      
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(26,26,26,0.95) 50%, rgba(0,0,0,0.95) 100%);
        backdrop-filter: blur(20px);
        z-index: 8888;
        pointer-events: none;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      document.body.appendChild(overlay);

      // Style the transition content
      const transitionContent = overlay.querySelector('.transition-content');
      transitionContent.style.cssText = `
        text-align: center;
        color: white;
        transform: translateY(50px);
      `;

      const transitionTitle = overlay.querySelector('.transition-title');
      transitionTitle.style.cssText = `
        font-size: 3rem;
        font-weight: bold;
        margin: 2rem 0;
        background: linear-gradient(45deg, #ffffff, #f0f0f0);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        letter-spacing: 2px;
      `;

      const transitionLines = overlay.querySelectorAll('.transition-line');
      transitionLines.forEach(line => {
        line.style.cssText = `
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, transparent, white, transparent);
          margin: 0 auto;
        `;
      });

      // Create scroll trigger for section transitions
      ScrollTrigger.create({
        trigger: sectionElement,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          // Show transition overlay
          gsap.set(overlay, { display: 'flex' });
          
          const tl = gsap.timeline();
          tl.to(overlay, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.inOut'
          })
          .from(transitionContent, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
          }, '-=0.2')
          .from(transitionLines, {
            scaleX: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
          }, '-=0.3')
          .to(overlay, {
            opacity: 0,
            duration: 0.4,
            delay: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set(overlay, { display: 'none' });
            }
          });
        }
      });

      // Add section reveal animations
      ScrollTrigger.create({
        trigger: sectionElement,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.from(sectionElement.children, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out'
          });
        }
      });
    });

    // Add smooth scrolling between sections
    const smoothScroll = (target) => {
      const targetPosition = target.offsetTop;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    };

    // Add navigation dots
    const navDots = document.createElement('div');
    navDots.className = 'section-nav-dots';
    navDots.style.cssText = `
      position: fixed;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    `;

    sections.forEach((section, index) => {
      const dot = document.createElement('div');
      dot.className = `nav-dot nav-dot-${index}`;
      dot.style.cssText = `
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        border: 2px solid rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
      `;

      // Add tooltip
      const tooltip = document.createElement('div');
      tooltip.textContent = section.name;
      tooltip.style.cssText = `
        position: absolute;
        right: 2rem;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.8rem;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      `;

      dot.appendChild(tooltip);

      dot.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
        dot.style.background = 'rgba(255, 255, 255, 0.8)';
        dot.style.transform = 'scale(1.2)';
      });

      dot.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        dot.style.background = 'rgba(255, 255, 255, 0.3)';
        dot.style.transform = 'scale(1)';
      });

      dot.addEventListener('click', () => {
        const targetSection = document.querySelector(section.id);
        if (targetSection) {
          smoothScroll(targetSection);
        }
      });

      navDots.appendChild(dot);

      // Update active dot based on scroll position
      ScrollTrigger.create({
        trigger: section.id,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          document.querySelectorAll('.nav-dot').forEach(d => {
            d.style.background = 'rgba(255, 255, 255, 0.3)';
            d.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          });
          dot.style.background = 'rgba(255, 255, 255, 0.9)';
          dot.style.borderColor = 'rgba(255, 255, 255, 1)';
        },
        onEnterBack: () => {
          document.querySelectorAll('.nav-dot').forEach(d => {
            d.style.background = 'rgba(255, 255, 255, 0.3)';
            d.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          });
          dot.style.background = 'rgba(255, 255, 255, 0.9)';
          dot.style.borderColor = 'rgba(255, 255, 255, 1)';
        }
      });
    });

    document.body.appendChild(navDots);

    // Cleanup function
    return () => {
      document.querySelectorAll('.section-overlay').forEach(overlay => {
        overlay.remove();
      });
      if (navDots.parentNode) {
        navDots.remove();
      }
    };

  }, []);

  return <div ref={transitionsRef} className="section-transitions" />;
};

export default SectionTransitions;
