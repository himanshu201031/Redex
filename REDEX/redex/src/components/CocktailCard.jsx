import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { useFavorites } from '../hooks/useFavorites.js';
import { MdLocalBar, MdList, MdArrowForward } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';

const CocktailCard = ({ cocktail, onClick }) => {
  const { isFavorite } = useFavorites();
  const cardRef = useRef();

  useGSAP(() => {
    const card = cardRef.current;
    
    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        y: -10,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(card.querySelector('.card-image'), {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(card.querySelector('.card-image'), {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transition-shadow duration-300 hover:shadow-2xl border-2 border-black"
      onClick={() => onClick(cocktail)}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-black overflow-hidden">
        <img
          src={cocktail.image}
          alt={cocktail.name}
          className="card-image w-full h-full object-contain p-4"
        />

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 rounded-full text-xs font-bold uppercase border border-white">
          {cocktail.category}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-white text-black px-3 py-1 rounded-full font-bold border border-black">
          {cocktail.price}
        </div>

        {/* Favorite Badge */}
        {isFavorite(cocktail.id) && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <FaHeart className="text-xs" />
            Favorite
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-black mb-2">{cocktail.name}</h3>
        <p className="text-black font-medium text-sm mb-3">{cocktail.title}</p>
        <p className="text-black text-sm line-clamp-2 mb-4">{cocktail.description}</p>

        {/* Quick Info */}
        <div className="flex justify-between items-center text-xs text-black">
          <span className="bg-black text-white px-2 py-1 rounded border border-black flex items-center gap-1">
            <MdLocalBar className="text-xs" />
            {cocktail.alcoholContent} ABV
          </span>
          <span className="bg-black text-white px-2 py-1 rounded border border-black flex items-center gap-1">
            <MdList className="text-xs" />
            {cocktail.ingredients.length} ingredients
          </span>
        </div>

        {/* Call to Action */}
        <div className="mt-4 pt-3 border-t border-black">
          <button className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-white hover:text-black border-2 border-black transition-all duration-300 flex items-center justify-center gap-2">
            View Details
            <MdArrowForward className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;
