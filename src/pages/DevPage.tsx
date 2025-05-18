
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAnimations } from '@/hooks/useAnimations';
import { Animation } from '@/types/animations';

const DevPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const { addAnimation } = useAnimations();
  
  const generateId = () => {
    const baseId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    setId(baseId);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !videoUrl || !category || !id) {
      setError('All fields are required');
      return;
    }
    
    const newAnimation: Animation = {
      id,
      title,
      description,
      videoUrl,
      category
    };
    
    addAnimation(newAnimation);
    
    // Clear form
    setTitle('');
    setDescription('');
    setVideoUrl('');
    setCategory('');
    setId('');
    
    // Navigate to the new animation
    navigate(`/${category}/${id}`);
  };
  
  return (
    <div className="mt-24 pb-32 max-w-2xl mx-auto px-4">
      <h1 className="text-2xl md:text-3xl font-medium mb-8">Dev Controls</h1>
      
      <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-xl font-medium mb-6">Add New Animation</h2>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 p-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                onBlur={generateId}
                placeholder="Animation Title"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="id">URL ID</Label>
              <Input 
                id="id" 
                value={id} 
                onChange={(e) => setId(e.target.value)}
                placeholder="animation-id"
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of the animation"
              className="bg-gray-800 border-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="videoUrl">Uploadcare Video URL</Label>
            <Input 
              id="videoUrl" 
              value={videoUrl} 
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://ucarecdn.com/your-video-id/"
              className="bg-gray-800 border-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gestures">Gestures</SelectItem>
                <SelectItem value="ios">iOS</SelectItem>
                <SelectItem value="microanimations">MicroInteractions</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full">
            Add Animation
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DevPage;
