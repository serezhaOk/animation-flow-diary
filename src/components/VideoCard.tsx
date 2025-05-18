
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Animation } from '@/types/animations';

interface VideoCardProps {
  animation: Animation;
  categoryId: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ animation, categoryId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks(animation.id);

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

  return (
    <div className="my-16 md:my-24">
      <div className="max-w-md mx-auto">
        <Link to={`/${categoryId}/${animation.id}`} className="block">
          <h2 className="text-xl md:text-2xl font-medium mb-3">{animation.title}</h2>
        </Link>
        
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
