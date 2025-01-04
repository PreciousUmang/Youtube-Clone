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
  }, [videoId]);  // Re-fetch when videoId changes

  // Handle loading and error states
  if (loading) {
    return <div className="py-20 text-center">Loading video...</div>; 
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;  
  }

  return (
    <div className="mx-auto p-8 container">
      {video && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="font-semibold text-3xl text-gray-900">{video.title}</h1>
            <VideoPlayer 
              videoUrl={video.videoUrl} 
              title={video.title}
              description={video.description}
            />
            <p className="mt-4 text-gray-700 text-lg">{video.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
