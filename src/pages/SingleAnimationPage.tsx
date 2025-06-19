
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Bookmark } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAnimations } from '@/hooks/useAnimations';
import { useBookmarks } from '@/hooks/useBookmarks';

const SingleAnimationPage = () => {
  const { categoryId, animationId } = useParams<{ categoryId: string, animationId: string }>();
  const { animations } = useAnimations();
  const { isBookmarked, toggleBookmark } = useBookmarks(animationId);
  const navigate = useNavigate();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const animation = animations.find(a => a.id === animationId);
  
  useEffect(() => {
    if (!animation && animations.length > 0) {
      navigate('/404', { replace: true });
    }
  }, [animation, animations, navigate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS compatibility - play then pause
    video.play();
    video.pause();

    function handleMove(e: MouseEvent | TouchEvent) {
      if (!video) return;
      
      const rect = video.getBoundingClientRect();
      const clientX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      const percentX = x / rect.width;
      
      if (video.duration && !isNaN(video.duration)) {
        video.currentTime = percentX * video.duration;
      }
    }

    video.addEventListener("mousemove", handleMove);
    video.addEventListener("touchmove", handleMove);

    return () => {
      video.removeEventListener("mousemove", handleMove);
      video.removeEventListener("touchmove", handleMove);
    };
  }, []);

  if (!animation) {
    return <div className="mt-32 text-center">Loading...</div>;
  }

  return (
    <div className="mt-24 pb-32 max-w-4xl mx-auto px-4">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 hover:opacity-80 transition-opacity" 
        onClick={() => navigate(`/${categoryId}`)}
      >
        <ChevronLeft size={20} className="mr-2" />
        Back to {categoryId}
      </Button>
      
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-medium">{animation.title}</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => toggleBookmark(animation)}
            className="hover:opacity-80 transition-opacity"
          >
            <Bookmark 
              size={24} 
              className={cn(isBookmarked ? "fill-white text-white" : "text-white")} 
            />
          </Button>
        </div>
        
        <div className="iphone-mockup">
          <div className="iphone-notch"></div>
          <div className="iphone-screen video-container">
            <video 
              ref={videoRef}
              src={animation.videoUrl}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-lg text-gray-300 mb-6">{animation.description}</p>
          
          <div className="bg-gray-900 p-4 rounded-md">
            <h3 className="font-medium mb-2">Share this animation</h3>
            <div className="flex items-center">
              <input 
                type="text" 
                readOnly 
                value={`${window.location.origin}/${categoryId}/${animationId}`} 
                className="bg-gray-800 text-sm p-2 rounded flex-1 mr-2"
              />
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/${categoryId}/${animationId}`);
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAnimationPage;
