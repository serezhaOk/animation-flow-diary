
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash } from 'lucide-react';
import { useAnimations } from '@/hooks/useAnimations';
import { Animation } from '@/types/animations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DevPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { animations, categories, addAnimation, addCategory, removeCategory } = useAnimations();
  
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
    
    // Show success toast
    toast({
      title: "Animation Added",
      description: `${title} has been added to the ${category} category.`,
    });
    
    // Clear form
    setTitle('');
    setDescription('');
    setVideoUrl('');
    setCategory('');
    setId('');
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    // Format category ID (lowercase, hyphens)
    const formattedCategory = newCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    if (addCategory(formattedCategory)) {
      toast({
        title: "Category Added",
        description: `${newCategory} has been added to categories.`,
      });
      setNewCategory('');
      setError(null);
    } else {
      setError('Category already exists');
    }
  };

  const handleRemoveCategory = (category: string) => {
    removeCategory(category);
    toast({
      title: "Category Removed",
      description: `${category} category has been removed.`,
      variant: "destructive",
    });
  };
  
  return (
    <div className="mt-24 pb-32 max-w-2xl mx-auto px-4">
      <h1 className="text-2xl md:text-3xl font-medium mb-8">Dev Controls</h1>
      
      {/* Category Management Section */}
      <Card className="mb-8 bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl">Manage Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 mb-6">
            <div className="flex-1 space-y-2">
              <Label htmlFor="newCategory">Add New Category</Label>
              <Input 
                id="newCategory" 
                value={newCategory} 
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category Name"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <Button 
              onClick={handleAddCategory} 
              className="flex items-center gap-1"
            >
              <Plus size={16} /> Add
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label>Current Categories</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map(cat => (
                <div key={cat} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                  <span className="capitalize">{cat}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveCategory(cat)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash size={16} className="text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Animation Add Section */}
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
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    <span className="capitalize">{cat}</span>
                  </SelectItem>
                ))}
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
