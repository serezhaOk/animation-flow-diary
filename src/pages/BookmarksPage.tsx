
import VideoCard from '@/components/VideoCard';
import { useBookmarks } from '@/hooks/useBookmarks';

const BookmarksPage = () => {
  const { bookmarkedAnimations } = useBookmarks();

  return (
    <div className="mt-24 pb-32 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-medium mb-8 text-center">Bookmarked Animations</h1>
      
      {bookmarkedAnimations.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-xl">You haven't bookmarked any animations yet.</p>
        </div>
      ) : (
        bookmarkedAnimations.map(animation => (
          <VideoCard 
            key={animation.id} 
            animation={animation} 
            categoryId={animation.category}
          />
        ))
      )}
    </div>
  );
};

export default BookmarksPage;
