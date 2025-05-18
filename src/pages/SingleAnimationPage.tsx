
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Bookmark } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAnimations } from '@/hooks/useAnimations';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Animation } from '@/types/animations';

const SingleAnimationPage = () => {
  const { categoryId, animationId } = useParams<{ categoryId: string, animationId: string }>();
  const { animations } = useAnimations();
  const { isBookmarked, toggleBookmark } = useBookmarks(animationId);
  const navigate = useNavigate();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const animation = animations.find(a => a.id === animationId);
  
  useEffect(() => {
    if (!animation && animations.length > 0) {
      navigate('/404', { replace: true });
    }
  }, [animation, animations, navigate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percent = Math.max(0, Math.min(1, x / width));
    
    videoRef.current.currentTime = percent * videoRef.current.duration;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isHovering) {
      video.pause();
    } else {
      video.currentTime = 0;
      video.play().catch(e => console.log("Auto-play prevented:", e));
    }
  }, [isHovering]);

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
          <div 
            ref={containerRef}
            className="iphone-screen video-container" 
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
          >
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
