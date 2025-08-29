import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState, useRef } from 'react';
import { allCocktails } from '../../constants/index.js';
import { useFavorites } from '../hooks/useFavorites.js';
import CocktailCard from './CocktailCard.jsx';
import CocktailModal from './CocktailModal.jsx';
import { MdFavorite, MdClose, MdClear, MdHeartBroken } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';

const FavoritesView = () => {
  const { favorites, clearFavorites, favoritesCount } = useFavorites();
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const containerRef = useRef();
  const overlayRef = useRef();

  // Get favorite cocktails
  const favoriteCocktails = allCocktails.filter(cocktail => 
    favorites.includes(cocktail.id)
  );

  useGSAP(() => {
    if (isVisible && containerRef.current) {
      // Animate favorites view entrance
      gsap.set(overlayRef.current, { display: 'flex' });
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      
      gsap.fromTo(containerRef.current,
        { scale: 0.8, y: 50 },
        { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)', delay: 0.1 }
      );

      // Animate favorite cards
      gsap.fromTo('.favorite-card',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.3
        }
      );
    }
  }, [isVisible]);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    if (overlayRef.current) {
      gsap.to(containerRef.current, {
        scale: 0.8,
        y: 50,
        duration: 0.3,
        ease: 'power2.in'
      });
      
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none' });
          setIsVisible(false);
        }
      });
    }
  };

  const handleCocktailClick = (cocktail) => {
    setSelectedCocktail(cocktail);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCocktail(null);
  };

  const handleClearAll = () => {
    // Animate cards out before clearing
    gsap.to('.favorite-card', {
      opacity: 0,
      scale: 0.8,
      y: -20,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        clearFavorites();
      }
    });
  };

  return (
    <>
      {/* Favorites Button */}
      <button
        onClick={handleOpen}
        className="fixed top-24 right-8 z-40 bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="View favorites"
      >
        <div className="relative">
          <FaHeart className="text-xl" />
          {favoritesCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-white text-red-500 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {favoritesCount}
            </div>
          )}
        </div>
      </button>

      {/* Favorites Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        style={{ display: 'none' }}
        onClick={(e) => e.target === overlayRef.current && handleClose()}
      >
        <div 
          ref={containerRef}
          className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <MdFavorite className="text-3xl" />
                  Your Favorites
                </h2>
                <p className="text-red-100">
                  {favoritesCount} cocktail{favoritesCount !== 1 ? 's' : ''} saved
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {favoritesCount > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                  >
                    <MdClear className="text-lg" />
                    Clear All
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-300"
                  aria-label="Close favorites"
                >
                  <MdClose className="text-lg" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {favoriteCocktails.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCocktails.map((cocktail) => (
                  <div key={cocktail.id} className="favorite-card">
                    <CocktailCard 
                      cocktail={cocktail} 
                      onClick={handleCocktailClick}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <MdHeartBroken className="text-6xl mb-4 text-black mx-auto" />
                <h3 className="text-2xl font-bold text-black mb-2">No favorites yet</h3>
                <p className="text-black mb-6">
                  Start exploring our cocktails and add your favorites by clicking the heart button!
                </p>
                <button
                  onClick={handleClose}
                  className="bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
                >
                  Explore Cocktails
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <CocktailModal 
        cocktail={selectedCocktail}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default FavoritesView;
