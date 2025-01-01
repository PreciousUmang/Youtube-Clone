import VideoCard from '../components/VideoCard';
import CategoryFilter from '../components/CategoryFilter';
import { useSelector } from 'react-redux';

const sampleVideos = [
  {
    videoId: '1',
    title: 'Learn React in 30 Minutes',
    thumbnailUrl: 'https://via.placeholder.com/150',
    channelName: 'Code with John',
    views: '15K',
  },
  {
    videoId: '2',
    title: 'JavaScript Basics',
    thumbnailUrl: 'https://via.placeholder.com/150',
    channelName: 'Tech Guru',
    views: '20K',
  },
];

const Home = () => {

  const videos = useSelector((state) => state.video.filteredVideos);

  return (
    <div className="p-4">
      <CategoryFilter />
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videos.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;