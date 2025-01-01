const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
      <div
        className={`fixed top-0 left-0 h-full bg-darkAccent text-primary transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="top-4 right-4 absolute text-secondary hover:text-primary"
        >
          Close
        </button>
  
        {/* Sidebar Links */}
        <ul className="space-y-4 mt-12 p-4">
          <li className="hover:text-secondary cursor-pointer">Home</li>
          <li className="hover:text-secondary cursor-pointer">Trending</li>
          <li className="hover:text-secondary cursor-pointer">Subscriptions</li>
          <li className="hover:text-secondary cursor-pointer">Library</li>
        </ul>
      </div>
    );
  };
export default Sidebar  