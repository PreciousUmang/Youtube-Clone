import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoDetails = () => {
  const { videoId } = useParams();
  const video = useSelector((state) =>
    state.video.videos.find((vid) => vid.videoId === videoId)
  );

  if (!video) {
    return <div>Video not found!</div>;
  }

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl">{video.title}</h1>
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="rounded-lg w-full max-h-96 object-cover"
      />
      <p className="mt-4">Channel: {video.channelName}</p>
      <p>{video.views} views</p>
    </div>
  );
};

export default VideoDetails;
