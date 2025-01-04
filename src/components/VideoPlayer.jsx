import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, title, description }) => {
  return (
    <div className="video-player">
      <h2>{title}</h2>
      <p>{description}</p>
      <ReactPlayer 
        url={videoUrl} 
        controls={true} 
        width="100%" 
        height="auto" 
      />
    </div>
  );
};

export default VideoPlayer;