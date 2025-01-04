import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  return (
    <div className="hover:shadow-lg p-4 border rounded-md transition">
      <Link to={`/video/${video._id}`}>
        <img src={video.thumbnailUrl} alt={video.title} className="rounded-md w-full h-48 object-cover" />
        <h3 className="mt-2 font-semibold text-lg">{video.title}</h3>
  <p className="text-gray-600 text-sm">{video.channelName}</p>
  <p className="text-gray-500 text-sm">{video.views} views</p>
      </Link>
    </div>
  );
};

export default VideoCard;



