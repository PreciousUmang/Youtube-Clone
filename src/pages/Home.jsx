import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../redux/videoActions';
import VideoCard from '../components/VideoCard';
import CategoryFilter from '../components/CategoryFilter';

const Home = () => {
  const dispatch = useDispatch();

  // Redux state (for filtering)
  const filteredVideos = useSelector((state) => state.video.filteredVideos);
  const loading = useSelector((state) => state.video.loading); 
  const error = useSelector((state) => state.video.error); 
 
  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  // Render the loading state or error if any
  if (loading) return <div className="p-20 text-center text-primary">Loading videos...</div>;
  if (error) return <div className="p-20 font-bold text-center text-red-500">{error}</div>;

  return (
    <div className="bg-gradient-to-r from-primary to-secondary p-4 md:p-6 lg:p-8 min-h-screen">
      <CategoryFilter />
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {filteredVideos.map((video) => (
          <VideoCard key={video.videoId || video._id} videos={[video]} />
        ))}
      </div>
    </div>
  );
};

export default Home;
