import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

const ChannelPage = () => {
  const [channels, setChannels] = useState([]);
  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState(null);
  const navigate = useNavigate();

  // Fetch channels and videos on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchChannels();
    }
  }, [navigate]);

  const fetchChannels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/channels', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setChannels(response.data);
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const fetchChannelDetails = async (channelId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/channels/${channelId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setChannel(response.data.channel);
      setVideos(response.data.videos);
    } catch (error) {
      console.error('Error fetching channel details:', error);
    }
  };

  return (
    <div className="bg-primary p-6 min-h-screen">
      <div className="mx-auto container">
        <h1 className="mb-4 font-semibold text-3xl text-secondary">My Channels</h1>
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">
          {channels.map((channel) => (
            <div
              key={channel._id}
              className="bg-white shadow-md p-4 rounded-lg cursor-pointer"
              onClick={() => fetchChannelDetails(channel._id)}
            >
              <h3 className="font-semibold text-secondary">{channel.name}</h3>
              <p className="text-secondary">{channel.description}</p>
            </div>
          ))}
        </div>
        {channel && (
          <div>
            <h2 className="mt-6 text-secondary text-xl">Videos for {channel.name}</h2>
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">
              {videos.map((video) => (
                <VideoCard key={video._id} video={video} onDelete={fetchChannelDetails} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
