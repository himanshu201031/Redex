import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useFavorites } from '../hooks/useFavorites.js';

const CocktailModal = ({ cocktail, isOpen, onClose }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const modalRef = useRef();
  const contentRef = useRef();

  useGSAP(() => {
    if (isOpen && modalRef.current) {
      // Animate modal entrance
      gsap.set(modalRef.current, { display: 'flex' });
      gsap.fromTo(modalRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      
      gsap.fromTo(contentRef.current,
        { scale: 0.8, y: 50 },
        { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)', delay: 0.1 }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current) {
      gsap.to(contentRef.current, {
        scale: 0.8,
        y: 50,
        duration: 0.3,
        ease: 'power2.in'
      });
      
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(modalRef.current, { display: 'none' });
          onClose();
        }
      });
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleToggleFavorite = () => {
    toggleFavorite(cocktail.id);

    // Add a little animation feedback
    const button = document.querySelector('.favorite-button');
    if (button) {
      gsap.to(button, {
        scale: 1.2,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      });
    }
  };

  if (!cocktail) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      style={{ display: 'none' }}
      onClick={(e) => e.target === modalRef.current && handleClose()}
    >
      <div 
        ref={contentRef}
        className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="relative p-6 border-b border-amber-200">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
          <h2 className="text-3xl font-bold text-amber-900 mb-2">{cocktail.name}</h2>
          <p className="text-amber-700 font-medium">{cocktail.title}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 p-4">
                <img 
                  src={cocktail.image} 
                  alt={cocktail.name}
                  className="w-full h-80 object-contain mx-auto"
                />
              </div>
              
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <p className="text-sm text-amber-600 font-medium">Price</p>
                  <p className="text-xl font-bold text-amber-900">{cocktail.price}</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <p className="text-sm text-amber-600 font-medium">Alcohol</p>
                  <p className="text-xl font-bold text-amber-900">{cocktail.alcoholContent}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Description</h3>
                <p className="text-amber-800 leading-relaxed">{cocktail.description}</p>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Ingredients</h3>
                <div className="grid grid-cols-2 gap-2">
                  {cocktail.ingredients.map((ingredient, index) => (
                    <div 
                      key={index}
                      className="bg-white/50 rounded-lg px-3 py-2 text-amber-800 text-sm font-medium"
                    >
                      • {ingredient}
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation */}
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Preparation</h3>
                <div className="bg-white/50 rounded-lg p-4">
                  <p className="text-amber-800 leading-relaxed">{cocktail.preparation}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleToggleFavorite}
                  className={`favorite-button flex-1 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    isFavorite(cocktail.id)
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                  }`}
                >
                  {isFavorite(cocktail.id) ? 'Remove from Favorites 💔' : 'Add to Favorites ❤️'}
                </button>
                <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105">
                  Order Now 🍹
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailModal;
