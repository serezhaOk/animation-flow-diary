
import { useState, useEffect } from 'react';
import { Animation } from '@/types/animations';

// Extended sample data with all categories
const sampleAnimations: Animation[] = [
  {
    id: 'calendar-transition',
    title: 'iOS Calendar Transition',
    description: 'Smooth month-to-month transition in iOS Calendar',
    videoUrl: 'https://ucarecdn.com/d45664b6-1a40-4268-83e8-ab3e029d9bc4/',
    category: 'transitions'
  },
  {
    id: 'pull-to-refresh',
    title: 'Pull to Refresh',
    description: 'Standard iOS pull-to-refresh gesture animation',
    videoUrl: 'https://ucarecdn.com/e189a4b5-6e69-4478-942c-c2a7dfa10535/',
    category: 'gestures'
  },
  {
    id: 'button-press',
    title: 'Button Press Animation',
    description: 'Subtle feedback animation for button press',
    videoUrl: 'https://ucarecdn.com/4796a656-db07-43ed-b8c5-9373137d6944/',
    category: 'microanimations'
  },
  {
    id: 'camera-zoom',
    title: 'Camera Zoom Effect',
    description: 'Smooth camera zoom transition',
    videoUrl: 'https://ucarecdn.com/e189a4b5-6e69-4478-942c-c2a7dfa10535/',
    category: 'camera'
  },
  {
    id: 'tab-navigation',
    title: 'Tab Navigation Animation',
    description: 'Fluid tab switching with highlight effect',
    videoUrl: 'https://ucarecdn.com/4796a656-db07-43ed-b8c5-9373137d6944/',
    category: 'navigation'
  },
  {
    id: 'button-morph',
    title: 'Button to Loading Morph',
    description: 'Button morphs into loading indicator',
    videoUrl: 'https://ucarecdn.com/d45664b6-1a40-4268-83e8-ab3e029d9bc4/',
    category: 'morphing'
  }
];

// Default categories
const defaultCategories = [
  'transitions',
  'microanimations',
  'camera',
  'navigation',
  'morphing',
  'gestures'
];

export const useAnimations = (categoryId?: string) => {
  const [animations, setAnimations] = useState<Animation[]>([]);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load animations and categories from localStorage or use defaults
  useEffect(() => {
    const loadData = () => {
      try {
        setLoading(true);
        
        // Try to load animations from localStorage
        const storedAnimations = localStorage.getItem('animations');
        const animationsData = storedAnimations 
          ? JSON.parse(storedAnimations) 
          : sampleAnimations;
        
        // Try to load categories from localStorage
        const storedCategories = localStorage.getItem('categories');
        const categoriesData = storedCategories 
          ? JSON.parse(storedCategories) 
          : defaultCategories;
        
        // Filter animations by category if needed
        const filteredAnimations = categoryId 
          ? animationsData.filter((a: Animation) => a.category === categoryId)
          : animationsData;
          
        setAnimations(filteredAnimations);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch animations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId]);

  // Add a new animation
  const addAnimation = (animation: Animation) => {
    setAnimations(prev => [...prev, animation]);
    
    // Get existing animations from localStorage or use sample data
    const existingAnimations = localStorage.getItem('animations');
    const allAnimations = existingAnimations 
      ? [...JSON.parse(existingAnimations), animation]
      : [...sampleAnimations, animation];
      
    localStorage.setItem('animations', JSON.stringify(allAnimations));
  };

  // Add a new category
  const addCategory = (category: string) => {
    // Don't add if category already exists
    if (categories.includes(category)) return false;
    
    const newCategories = [...categories, category];
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
    return true;
  };

  // Remove a category and its animations
  const removeCategory = (category: string) => {
    const newCategories = categories.filter(c => c !== category);
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
    
    // Remove all animations in this category
    const existingAnimations = localStorage.getItem('animations');
    if (existingAnimations) {
      const parsedAnimations = JSON.parse(existingAnimations);
      const filteredAnimations = parsedAnimations.filter(
        (a: Animation) => a.category !== category
      );
      localStorage.setItem('animations', JSON.stringify(filteredAnimations));
    }
  };

  return { 
    animations, 
    categories, 
    loading, 
    error, 
    addAnimation,
    addCategory,
    removeCategory
  };
};
