
import { Link } from 'react-router-dom';
import { Bookmark, Info } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 md:p-8">
      <Link to="/" className="hover:opacity-80 transition-opacity">
        <img 
          src="/lovable-uploads/1fb86a2c-b32d-417b-9b07-1c8d41e1fc55.png" 
          alt="Motion Log" 
          className="h-10 w-auto"
        />
      </Link>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" asChild className="p-2 hover:opacity-80 transition-opacity">
          <Link to="/bookmarks" aria-label="Bookmarks">
            <Bookmark size={24} />
          </Link>
        </Button>
        
        <Button variant="ghost" asChild className="p-2 hover:opacity-80 transition-opacity">
          <Link to="/about" aria-label="About">
            <Info size={24} />
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
