import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, title, description }) => {
  return (
    <div className="video-player-container">
      <ReactPlayer url={videoUrl} controls={true} className="rounded-lg" />
      <h2 className="mt-4 font-bold text-xl">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default VideoPlayer;