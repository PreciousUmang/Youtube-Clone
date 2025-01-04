import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios'; // Adjust based on your axios configuration

const VideoDetails = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);  // Tracks loading state
  const [error, setError] = useState(null);  // Tracks error state

  // Fetch the video data
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoResponse = await axios.get(`/videos/${videoId}`);
        setVideo(videoResponse.data);
        setLoading(false);  // Data fetched, set loading to false
      } catch (err) {
        setError('Error fetching video data');
        setLoading(false);  // Even in case of an error, stop loading
      }
    };

    fetchVideoData();
  }, [videoId]);  // Re-fetch when videoId changes

  // Handle loading and error states
  if (loading) {
    return <div className="py-20 text-center">Loading video...</div>;  // Shows loading message
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;  // Shows error message if any
  }

  return (
    <div className="mx-auto p-8 container">
      {video && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="font-semibold text-3xl text-gray-900">{video.title}</h1>
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="mt-4 rounded-md w-full h-96 object-cover"
            />
            <p className="mt-4 text-gray-700 text-lg">{video.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
