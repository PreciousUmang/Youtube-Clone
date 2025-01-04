import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', {
        username,
        email,
        password,
      });
      console.log('User registered:', response.data);
      alert('User has been successfully registered')
    } catch (error) {
      setError('Error during sign-up. Please try again.');
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-primary px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="space-y-6 bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="font-semibold text-2xl text-center text-secondary">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-gray-300 focus:border-accent shadow-sm p-3 border rounded-lg focus:ring-2 focus:ring-accent w-full focus:outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 focus:border-accent shadow-sm p-3 border rounded-lg focus:ring-2 focus:ring-accent w-full focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300 focus:border-accent shadow-sm p-3 border rounded-lg focus:ring-2 focus:ring-accent w-full focus:outline-none"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-accent hover:bg-darkAccent focus:ring-opacity-50 shadow-md py-3 rounded-lg focus:ring-2 focus:ring-accent w-full font-semibold text-white focus:outline-none"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center">
          <p className="text-secondary text-sm">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-accent hover:text-darkAccent">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
