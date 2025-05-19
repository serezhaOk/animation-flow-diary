
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'transitions', name: 'Transitions' },
  { id: 'microanimations', name: 'Micro Animations' },
  { id: 'camera', name: 'Camera' },
  { id: 'navigation', name: 'Navigation' },
  { id: 'morphing', name: 'Morphing' },
  { id: 'gestures', name: 'Gestures' }
];

const CategoryList = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'gestures';

  return (
    <div className="category-list fixed bottom-8 left-8 bg-black bg-opacity-50 backdrop-blur-sm p-4 rounded-lg z-10">
      <ul className="space-y-3">
        {categories.map(category => (
          <li key={category.id}>
            <Link 
              to={`/${category.id}`} 
              className={cn(
                "text-sm md:text-base hover:opacity-80 transition-opacity",
                currentPath === category.id ? "opacity-100 font-medium" : "opacity-60"
              )}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
