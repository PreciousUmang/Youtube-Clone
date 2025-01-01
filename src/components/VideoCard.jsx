const VideoCard = ({ video }) => {
  return (
    <div className="bg-primary p-2 w-60">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="rounded-lg w-full h-32 object-cover"
      />
      <div className="mt-2">
        <h3 className="font-semibold text-darkAccent text-sm">{video.title}</h3>
        <p className="text-secondary text-xs">{video.channelName}</p>
        <p className="text-secondary text-xs">{video.views} views</p>
      </div>
    </div>
  );
};

export default VideoCard