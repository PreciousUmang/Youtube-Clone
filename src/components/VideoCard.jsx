import { Link } from 'react-router-dom';

const VideoCard = ({ videos = [] }) => {
  return (
    <>
      {videos.map(video => (
        <div key={video._id} className="bg-white hover:bg-gray-100 shadow-md rounded-md w-full transition duration-300 ease-in-out">
          <Link to={`/video/${video._id}`}>
            <img src={video.thumbnailUrl} alt={video.title} className="rounded-t-md w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="mt-2 font-semibold text-lg text-primary">{video.title}</h3>
              <p className="text-gray-600 text-sm">{video.channelName}</p>
              <p className="text-gray-500 text-sm">{video.views} views</p>
              <div className="flex justify-between items-center mt-4">
                <button className="bg-accent hover:bg-darkAccent px-4 py-2 rounded font-bold text-white">
                  Watch Now
                </button>
                <button className="bg-secondary hover:bg-darkAccent px-4 py-2 rounded font-bold text-white">
                  Learn More
                </button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default VideoCard