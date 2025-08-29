import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'cocktail-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const addToFavorites = (cocktailId) => {
    setFavorites(prev => {
      if (!prev.includes(cocktailId)) {
        return [...prev, cocktailId];
      }
      return prev;
    });
  };

  const removeFromFavorites = (cocktailId) => {
    setFavorites(prev => prev.filter(id => id !== cocktailId));
  };

  const toggleFavorite = (cocktailId) => {
    if (favorites.includes(cocktailId)) {
      removeFromFavorites(cocktailId);
    } else {
      addToFavorites(cocktailId);
    }
  };

  const isFavorite = (cocktailId) => {
    return favorites.includes(cocktailId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };
};
