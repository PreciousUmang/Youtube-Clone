import VideoCard from '../components/VideoCard';

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
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {sampleVideos.map((video) => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </div>
  );
};

export default Home;