import { useState } from 'react';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        const newState = !isSidebarOpen;
        setSidebarOpen(newState);
        onSidebarToggle(newState); 
    };


  return (
    <>
      <header className="flex justify-between items-center bg-red-500 p-4 text-white">
        <button onClick={toggleSidebar}>☰</button>
        <h1 className="font-bold text-lg">YouTube Clone</h1>
        <SearchBar/>
        <button>Sign In</button>
      </header>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;