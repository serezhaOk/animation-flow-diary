
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'gestures', name: 'Gestures' },
  { id: 'ios', name: 'iOS' },
  { id: 'microanimations', name: 'MicroInteractions' }
];

const CategoryList = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'gestures';

  return (
    <div className="category-list bg-black bg-opacity-50 backdrop-blur-sm p-4 rounded-lg">
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
