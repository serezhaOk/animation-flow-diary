
import { useState, useEffect } from 'react';
import { Animation } from '@/types/animations';

export const useBookmarks = (animationId?: string) => {
  const [bookmarkedAnimations, setBookmarkedAnimations] = useState<Animation[]>([]);
  
  // Load bookmarks from localStorage
  useEffect(() => {
    const bookmarksString = localStorage.getItem('bookmarks');
    if (bookmarksString) {
      try {
        const bookmarks = JSON.parse(bookmarksString);
        setBookmarkedAnimations(bookmarks);
      } catch (e) {
        console.error('Failed to parse bookmarks from localStorage', e);
        localStorage.removeItem('bookmarks');
      }
    }
  }, []);

  const isBookmarked = animationId ? bookmarkedAnimations.some(a => a.id === animationId) : false;

  const toggleBookmark = (animation: Animation) => {
    setBookmarkedAnimations(prev => {
      let newBookmarks;
      
      if (prev.some(a => a.id === animation.id)) {
        newBookmarks = prev.filter(a => a.id !== animation.id);
      } else {
        newBookmarks = [...prev, animation];
      }
      
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  return { bookmarkedAnimations, isBookmarked, toggleBookmark };
};
