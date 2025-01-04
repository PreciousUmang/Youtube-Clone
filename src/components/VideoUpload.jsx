import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VideoUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [channelId, setChannelId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannelId = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/channels/my', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setChannelId(response.data._id);
      } catch (err) {
        console.error('Error fetching channel ID:', err);
        setError('Failed to fetch channel ID');
      }
    };

    fetchChannelId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const videoData = {
      title,
      description,
      videoUrl,
      channelId,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/videos', videoData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Video uploaded:', response.data);
      navigate('/'); 
    } catch (err) {
      console.error('Error uploading video:', err);
      setError('Failed to upload video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-primary p-4 min-h-screen text-secondary">
      <h2 className="mb-6 font-bold text-3xl">Upload Video</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-full max-w-lg">
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700 text-sm" htmlFor="title">
            Video Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent w-full focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700 text-sm" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent w-full focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700 text-sm" htmlFor="videoUrl">
            Video URL
          </label>
          <input
            type="text"
            id="videoUrl"
            placeholder="Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent w-full focus:outline-none"
          />
        </div>
        {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading || !channelId}
          className="bg-accent hover:bg-darkAccent shadow-lg px-4 py-2 rounded-lg w-full text-darkAccent hover:text-accent transition duration-300"
        >
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;