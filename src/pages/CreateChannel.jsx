import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateChannel = () => {
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      try {
        const userId = JSON.parse(atob(token.split('.')[1])).userId; // Extract user ID from token
        const response = await axios.post(
          'http://localhost:5000/api/channels/create',
          {
            channelName,
            description,
            owner: userId,
            banner, 
            subscribers: 0, 
            createdAt: new Date().toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Channel created:', response.data);
        navigate('/upload');
      } catch (error) {
        setError('Error creating channel. Please try again.');
        console.error('Error creating channel:', error.response ? error.response.data : error.message); // Add detailed logging
      }
    }
  };

  return (
    <div className="bg-primary p-6 min-h-screen">
      <div className="mx-auto max-w-md container">
        <h2 className="mb-4 font-semibold text-2xl text-secondary">Create Channel</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleCreateChannel} className="space-y-4">
          <input
            type="text"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="border-gray-300 p-3 border rounded-lg w-full"
          />
          <textarea
            placeholder="Channel Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-gray-300 p-3 border rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Banner URL"
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
            className="border-gray-300 p-3 border rounded-lg w-full"
          />
          <button
            type="submit"
            className="bg-accent hover:bg-darkAccent px-4 py-2 rounded-md w-full text-white"
          >
            Create Channel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
