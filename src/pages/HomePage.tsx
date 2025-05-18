
import { useParams } from 'react-router-dom';
import VideoCard from '@/components/VideoCard';
import { useAnimations } from '@/hooks/useAnimations';

const HomePage = () => {
  const { categoryId = 'gestures' } = useParams<{ categoryId?: string }>();
  const { animations, loading, error } = useAnimations(categoryId);

  if (loading) {
    return <div className="mt-32 text-center">Loading animations...</div>;
  }

  if (error) {
    return <div className="mt-32 text-center text-red-500">{error}</div>;
  }

  if (animations.length === 0) {
    return (
      <div className="mt-32 text-center">
        <h2 className="text-2xl font-medium">No animations found</h2>
        <p className="mt-2 text-muted-foreground">Try a different category or check back later.</p>
      </div>
    );
  }

  return (
    <div className="mt-24 pb-32 max-w-4xl mx-auto">
      {animations.map(animation => (
        <VideoCard 
          key={animation.id} 
          animation={animation} 
          categoryId={categoryId}
        />
      ))}
    </div>
  );
};

export default HomePage;
