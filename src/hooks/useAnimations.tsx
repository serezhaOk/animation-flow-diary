
import { useState, useEffect } from 'react';
import { Animation } from '@/types/animations';

// Sample data - in a real app, this would come from an API
const sampleAnimations: Animation[] = [
  {
    id: 'calendar-transition',
    title: 'iOS Calendar Transition',
    description: 'Smooth month-to-month transition in iOS Calendar',
    videoUrl: 'https://ucarecdn.com/d45664b6-1a40-4268-83e8-ab3e029d9bc4/',
    category: 'ios'
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
  }
];

export const useAnimations = (categoryId?: string) => {
  const [animations, setAnimations] = useState<Animation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchAnimations = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        const data = categoryId 
          ? sampleAnimations.filter(a => a.category === categoryId)
          : sampleAnimations;
          
        setAnimations(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch animations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimations();
  }, [categoryId]);

  const addAnimation = (animation: Animation) => {
    setAnimations(prev => [...prev, animation]);
    
    // In a real app, you would save this to your backend
    // For this demo, we'll store in localStorage
    const allAnimations = [...sampleAnimations, animation];
    localStorage.setItem('animations', JSON.stringify(allAnimations));
  };

  return { animations, loading, error, addAnimation };
};
