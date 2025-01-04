import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-primary p-4 min-h-screen text-secondary">
      <h1 className="mb-4 font-bold text-6xl animate-bounce">404</h1>
      <p className="mb-8 text-xl">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-accent hover:bg-darkAccent shadow-lg px-6 py-3 rounded-lg text-darkAccent hover:text-accent transition duration-300"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;