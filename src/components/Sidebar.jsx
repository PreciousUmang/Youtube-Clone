import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('userName');
    window.location.reload();
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-darkAccent text-primary transition-transform duration-300 ease-in-out shadow-lg ${
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
        <Link to="/">
          <li className="hover:text-secondary cursor-pointer">Home</li>
        </Link>
        <Link to="/create-channel">
          <li className="hover:text-secondary cursor-pointer">Create a Channel</li>
        </Link>
        <Link to="/upload">
          <li className="hover:text-secondary cursor-pointer">Upload a Video</li>
        </Link>
        {userName && (
          <>
            <Link to="/library">
              <li className="hover:text-secondary cursor-pointer">Library</li>
            </Link>
            <li
              onClick={handleLogout}
              className="hover:text-secondary cursor-pointer"
            >
              Logout
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;