
import { Outlet } from 'react-router-dom';
import Header from './Header';
import CategoryList from './CategoryList';

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-16 px-4">
        <Outlet />
      </main>
      
      <CategoryList />
    </div>
  );
};

export default Layout;
