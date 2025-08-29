import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState, useRef } from 'react';
import { MdSearch, MdTune, MdClear } from 'react-icons/md';
import { FaCocktail, FaLeaf, FaAppleAlt, FaGlassCheers } from 'react-icons/fa';

const SearchAndFilter = ({ onSearch, onFilter, filters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchRef = useRef();
  const filterRef = useRef();

  useGSAP(() => {
    // Animate search bar entrance
    gsap.fromTo(searchRef.current,
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2
      }
    );
  }, []);

  useGSAP(() => {
    if (isFilterOpen && filterRef.current) {
      gsap.fromTo(filterRef.current,
        { opacity: 0, height: 0, y: -20 },
        { 
          opacity: 1, 
          height: 'auto', 
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        }
      );
    } else if (filterRef.current) {
      gsap.to(filterRef.current, {
        opacity: 0,
        height: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isFilterOpen]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    onFilter(filterType, value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    onSearch('');
    onFilter('category', 'all');
    onFilter('priceRange', 'all');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border-2 border-black">
      {/* Search Bar */}
      <div ref={searchRef} className="relative mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search cocktails by name, ingredient, or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-black bg-white focus:border-black focus:outline-none transition-colors duration-300 text-black placeholder-black"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black">
            <MdSearch className="text-xl" />
          </div>
        </div>
      </div>

      {/* Filter Toggle and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
        >
          <MdTune className="text-lg" />
          <span>Filters</span>
          <span className={`transform transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-black text-sm">
            {Object.values(filters).some(f => f !== 'all') || searchTerm ? 'Filters active' : 'No filters'}
          </span>

          {(Object.values(filters).some(f => f !== 'all') || searchTerm) && (
            <button
              onClick={clearFilters}
              className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-300 flex items-center gap-1"
            >
              <MdClear className="text-sm" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      <div 
        ref={filterRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="pt-6 border-t border-black mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-black font-medium mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-black bg-white focus:border-black focus:outline-none transition-colors duration-300 text-black"
              >
                <option value="all">All Categories</option>
                <option value="cocktail">Cocktails</option>
                <option value="mocktail">Mocktails</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-black font-medium mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-black bg-white focus:border-black focus:outline-none transition-colors duration-300 text-black"
              >
                <option value="all">All Prices</option>
                <option value="budget">Under $15</option>
                <option value="mid">$15 - $20</option>
                <option value="premium">Over $20</option>
              </select>
            </div>

            {/* Alcohol Content Filter */}
            <div>
              <label className="block text-black font-medium mb-2">Alcohol Content</label>
              <select
                value={filters.alcoholContent}
                onChange={(e) => handleFilterChange('alcoholContent', e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-black bg-white focus:border-black focus:outline-none transition-colors duration-300 text-black"
              >
                <option value="all">All Strengths</option>
                <option value="light">Light (0-10%)</option>
                <option value="medium">Medium (11-15%)</option>
                <option value="strong">Strong (16%+)</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="mt-6">
            <p className="text-black font-medium mb-3">Quick Filters:</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Popular', icon: FaCocktail, filter: 'popular' },
                { label: 'Fresh & Light', icon: FaLeaf, filter: 'fresh' },
                { label: 'Fruity', icon: FaAppleAlt, filter: 'fruity' },
                { label: 'Classic', icon: FaGlassCheers, filter: 'classic' }
              ].map((quickFilter) => (
                <button
                  key={quickFilter.filter}
                  onClick={() => handleFilterChange('quickFilter', quickFilter.filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 border-2 ${
                    filters.quickFilter === quickFilter.filter
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black hover:bg-black hover:text-white'
                  }`}
                >
                  <quickFilter.icon className="text-sm" />
                  {quickFilter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
