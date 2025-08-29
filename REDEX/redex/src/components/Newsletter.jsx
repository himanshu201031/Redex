import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState, useRef } from 'react';
import { MdEmail, MdCelebration, MdLock, MdLocalBar } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const containerRef = useRef();
  const formRef = useRef();
  const successRef = useRef();

  useGSAP(() => {
    // Animate container entrance
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    // Floating animation for decorative elements
    gsap.to('.float-element', {
      y: -10,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.3
    });
  }, []);

  useGSAP(() => {
    if (isSubmitted && successRef.current) {
      // Hide form and show success message
      gsap.to(formRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in'
      });

      gsap.fromTo(successRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          delay: 0.2
        }
      );

      // Confetti effect
      for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
          position: absolute;
          width: 10px;
          height: 10px;
          background: ${['#f59e0b', '#ea580c', '#dc2626', '#16a34a'][Math.floor(Math.random() * 4)]};
          top: 50%;
          left: 50%;
          pointer-events: none;
          border-radius: 50%;
        `;
        containerRef.current.appendChild(confetti);

        gsap.to(confetti, {
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 400,
          rotation: Math.random() * 360,
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out',
          onComplete: () => confetti.remove()
        });
      }
    }
  }, [isSubmitted]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setEmail('');
    setError('');
    
    // Reset animations
    gsap.set(formRef.current, { opacity: 1, y: 0 });
    gsap.set(successRef.current, { opacity: 0, scale: 0.8, y: 20 });
  };

  return (
    <section id="newsletter" className="py-20 bg-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="float-element absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="float-element absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
        <div className="float-element absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full"></div>
        <div className="float-element absolute bottom-32 right-10 w-24 h-24 bg-white rounded-full"></div>
      </div>

      <div ref={containerRef} className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-black">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 flex items-center justify-center gap-4">
              <MdLocalBar className="text-5xl" />
              Stay in the Mix!
            </h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Get exclusive cocktail recipes, special offers, and be the first to know about our latest creations.
              Join our community of cocktail enthusiasts!
            </p>
          </div>

          {/* Form */}
          <div ref={formRef} className={isSubmitted ? 'hidden' : 'block'}>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="relative mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={`w-full px-6 py-4 rounded-xl border-2 bg-white text-black ${
                    error ? 'border-red-500' : 'border-black'
                  } focus:border-black focus:outline-none transition-colors duration-300 placeholder-black`}
                  disabled={isLoading}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2 text-left">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-8 rounded-xl font-bold transition-all duration-300 transform border-2 border-black ${
                  isLoading
                    ? 'bg-black text-white cursor-not-allowed'
                    : 'bg-black text-white hover:bg-white hover:text-black hover:scale-105'
                } shadow-lg`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  'Subscribe to Newsletter'
                )}
              </button>
            </form>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-black">
              <div className="flex items-center justify-center gap-2">
                <MdEmail className="text-lg" />
                <span>Weekly recipes</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MdCelebration className="text-lg" />
                <span>Exclusive offers</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MdLock className="text-lg" />
                <span>No spam, ever</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div ref={successRef} className={isSubmitted ? 'block' : 'hidden'} style={{ opacity: 0 }}>
            <div className="text-center">
              <FaCheckCircle className="text-6xl mb-4 text-green-500 mx-auto" />
              <h3 className="text-3xl font-bold text-black mb-4">Welcome to the Club!</h3>
              <p className="text-lg text-black mb-6">
                Thank you for subscribing! Check your email for a special welcome cocktail recipe.
              </p>
              <button
                onClick={resetForm}
                className="bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
              >
                Subscribe Another Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
