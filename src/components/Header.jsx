import { useState } from 'react';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const Header = ({ onSidebarToggle }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const userName = localStorage.getItem('userName');
  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setSidebarOpen(newState);
    onSidebarToggle(newState);
  };

  return (
    <>
<header className="flex justify-between items-center bg-primary shadow-lg p-4 text-darkAccent">
<button onClick={toggleSidebar} className="px-4 text-secondary hover:text-darkAccent transition">
          ☰
        </button>
<h1 className="font-bold text-accent text-lg">YouTube Clone</h1>
        <SearchBar />
        <div>
        {userName ? (
<span className="mx-4 font-semibold text-accent">🟢{userName}</span>
        ) : (
          <Link to={'/signup'}>
<button className="text-accent hover:text-darkAccent transition">Sign Up</button>
          </Link>
        )}
      </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
