import { useState } from 'react';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';

const Header = ({ onSidebarToggle }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setSidebarOpen(newState);
    onSidebarToggle(newState);
  };

  return (
    <>
      <header className="flex justify-between items-center bg-primary p-4 text-darkAccent">
        <button onClick={toggleSidebar} className="text-secondary hover:text-accent">
          ☰
        </button>
        <h1 className="font-bold text-lg text-secondary">YouTube Clone</h1>
        <SearchBar />
        <button className="text-accent hover:text-secondary">Sign In</button>
      </header>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
