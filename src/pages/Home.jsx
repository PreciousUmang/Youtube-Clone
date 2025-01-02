import { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import CategoryFilter from '../components/CategoryFilter';
import { useSelector } from 'react-redux';
import axios from 'axios'; 

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redux state (for filtering)
  const filteredVideos = useSelector((state) => state.video.filteredVideos);

  // Fetch videos and their comments from the backend API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos'); 
        setVideos(response.data);  // Set the videos data fetched from API
        setLoading(false);
      } catch (err) {
        setError('Error fetching videos');
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Render the loading state or error if any
  if (loading) return <div>Loading videos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <CategoryFilter />
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredVideos.length > 0
          ? filteredVideos.map((video) => (
              <VideoCard key={video.videoId} video={video} />
            ))
          : videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
      </div>
    </div>
  );
};

export default Home;