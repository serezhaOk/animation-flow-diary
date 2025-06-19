
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useIsMobile } from '@/hooks/use-mobile';
import { Animation } from '@/types/animations';

interface VideoCardProps {
  animation: Animation;
  categoryId: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ animation, categoryId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isBookmarked, toggleBookmark } = useBookmarks(animation.id);
  const isMobile = useIsMobile();

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

    // Auto-play on mobile when in viewport
    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              video.play().catch(e => console.log("Mobile auto-play prevented:", e));
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(video);
      
      return () => {
        video.removeEventListener("mousemove", handleMove);
        video.removeEventListener("touchmove", handleMove);
        observer.disconnect();
      };
    }

    return () => {
      video.removeEventListener("mousemove", handleMove);
      video.removeEventListener("touchmove", handleMove);
    };
  }, [isMobile]);

  return (
    <div className="my-16 md:my-24">
      <div className="max-w-md mx-auto">
        <Link to={`/${categoryId}/${animation.id}`} className="block">
          <h2 className="text-xl md:text-2xl font-medium mb-3">{animation.title}</h2>
        </Link>
        
        <div className="iphone-mockup">
          <div className="iphone-notch"></div>
          <div className="iphone-screen video-container">
            <video 
              ref={videoRef}
              id={`video-${animation.id}`}
              src={animation.videoUrl}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <p className="text-base text-gray-400">{animation.description}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.preventDefault();
              toggleBookmark(animation);
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <Bookmark 
              size={20} 
              className={cn(isBookmarked ? "fill-white text-white" : "text-white")} 
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
