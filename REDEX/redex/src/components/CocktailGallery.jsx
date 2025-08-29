import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState, useRef, useMemo, useEffect } from 'react';
import { allCocktails } from '../../constants/index.js';
import CocktailCard from './CocktailCard.jsx';
import CocktailModal from './CocktailModal.jsx';
import SearchAndFilter from './SearchAndFilter.jsx';
import SkeletonCard from './SkeletonCard.jsx';
import { MdLocalBar, MdSearch } from 'react-icons/md';
import { FaCocktail } from 'react-icons/fa';

const CocktailGallery = () => {
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    alcoholContent: 'all',
    quickFilter: 'all'
  });
  const galleryRef = useRef();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second loading simulation

    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    // Animate gallery entrance
    gsap.fromTo('.cocktail-card', 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        }
      }
    );

    // Animate section title
    gsap.fromTo('.gallery-title',
      { opacity: 0, y: -30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 90%',
        }
      }
    );
  }, []);

  // Filter and search logic
  const filteredCocktails = useMemo(() => {
    let filtered = allCocktails;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(cocktail =>
        cocktail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cocktail.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cocktail.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(cocktail => cocktail.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(cocktail => {
        const price = parseInt(cocktail.price.replace('$', ''));
        switch (filters.priceRange) {
          case 'budget': return price < 15;
          case 'mid': return price >= 15 && price <= 20;
          case 'premium': return price > 20;
          default: return true;
        }
      });
    }

    // Alcohol content filter
    if (filters.alcoholContent !== 'all') {
      filtered = filtered.filter(cocktail => {
        const alcohol = parseInt(cocktail.alcoholContent.replace('%', ''));
        switch (filters.alcoholContent) {
          case 'light': return alcohol <= 10;
          case 'medium': return alcohol > 10 && alcohol <= 15;
          case 'strong': return alcohol > 15;
          default: return true;
        }
      });
    }

    return filtered;
  }, [searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCocktailClick = (cocktail) => {
    setSelectedCocktail(cocktail);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCocktail(null);
  };

  return (
    <section id="cocktail-gallery" ref={galleryRef} className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="gallery-title text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4">
            <FaCocktail className="text-5xl" />
            Our Signature Collection
          </h2>
          <p className="gallery-title text-lg text-white max-w-2xl mx-auto">
            Discover our carefully crafted cocktails, each with its own unique story and flavor profile.
            Click on any cocktail to explore its ingredients and preparation method.
          </p>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          filters={filters}
        />

        {/* Results Info */}
        <div className="mb-6 text-center">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white">Loading cocktails...</p>
            </div>
          ) : (
            <p className="text-white">
              Showing {filteredCocktails.length} of {allCocktails.length} cocktails
            </p>
          )}
        </div>

        {/* Cocktail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            // Show skeleton cards while loading
            [...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : filteredCocktails.length > 0 ? (
            filteredCocktails.map((cocktail) => (
              <div key={cocktail.id} className="cocktail-card">
                <CocktailCard
                  cocktail={cocktail}
                  onClick={handleCocktailClick}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <MdSearch className="text-6xl mb-4 text-white mx-auto" />
              <h3 className="text-2xl font-bold text-white mb-2">No cocktails found</h3>
              <p className="text-white mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilters({
                    category: 'all',
                    priceRange: 'all',
                    alcoholContent: 'all',
                    quickFilter: 'all'
                  });
                }}
                className="bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-black hover:text-white border-2 border-white transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Featured Cocktail Banner */}
        <div className="mt-16 bg-white rounded-2xl p-8 text-black text-center border-2 border-black">
          <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
            <MdLocalBar className="text-2xl" />
            Cocktail of the Month
          </h3>
          <p className="text-lg mb-6 text-black">
            Try our featured {allCocktails[0]?.name} - specially crafted by our master mixologist!
          </p>
          <button
            onClick={() => handleCocktailClick(allCocktails[0])}
            className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-black border-2 border-black transition-colors duration-300"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Modal */}
      <CocktailModal 
        cocktail={selectedCocktail}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default CocktailGallery;
