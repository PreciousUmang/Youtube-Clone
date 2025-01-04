import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import VideoPlayer from '../components/VideoPlayer';

const VideoDetails = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the video data
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoResponse = await axios.get(`/videos/${videoId}`);
        setVideo(videoResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching video data');
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]); 

  if (loading) {
    return (
      <div className="p-20 text-center text-primary">
        <div className="inline-block border-4 spinner-border rounded-full w-8 h-8 text-primary animate-spin" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-20 text-center text-red-500">{error}</div>;
  }

  return (
<div className="bg-gradient-to-r from-primary to-secondary shadow-lg mx-auto p-8 container">
      {video && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="font-semibold text-4xl text-gray-900">{video.title}</h1>
            <VideoPlayer videoUrl={video.videoUrl} title={video.title} description={video.description} />
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-600">Uploaded By: {video.channelId.channelName}</p>
              <p className="text-gray-500">Subscribers: {video.channelId.subscribers}</p>
            </div>
            <p className="mt-4 text-gray-700 text-lg">{video.description}</p>
            <div className="flex space-x-4 mt-6">
<button className="bg-accent hover:bg-darkAccent shadow px-4 py-2 rounded text-white transition">Like</button>
<button className="bg-gray-300 hover:bg-gray-400 shadow px-4 py-2 rounded text-gray-700 transition">Share</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
