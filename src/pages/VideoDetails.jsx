import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import VideoPlayer from '../components/VideoPlayer';

const VideoDetails = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  // Fetch the video data
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoResponse = await axios.get(`/videos/${videoId}`);
        setVideo(videoResponse.data);
        setLoading(false);
        fetchComments();
      } catch (err) {
        setError('Error fetching video data');
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsResponse = await axios.get(`/${videoId}/comments`);
        setComments(commentsResponse.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchVideoData();
  }, [videoId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/${videoId}/comments`, { text: newComment }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments((prevComments) => [response.data, ...prevComments]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

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
    <div className="bg-gradient-to-r from-primary to-secondary shadow-lg mx-auto p-4 md:p-8 container">
      {video && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 md:p-6">
            <h1 className="mb-4 font-semibold text-2xl text-gray-900 md:text-4xl">{video.title}</h1>
            <VideoPlayer videoUrl={video.videoUrl} title={video.title} description={video.description} videoId={videoId} />
            <div className="flex md:flex-row flex-col justify-between items-center mt-4">
              <p className="font-semibold text-primary">Uploaded By: {video.channelId.channelName}</p>
              <p className="text-gray-500">Subscribers: {video.channelId.subscribers}</p>
            </div>
            <div className="flex md:flex-row flex-col md:space-x-4 space-y-2 md:space-y-0 mt-6">
              <button className="bg-accent hover:bg-darkAccent shadow px-4 py-2 rounded text-white transition duration-300 ease-in-out">Like</button>
              <button className="bg-gray-300 hover:bg-gray-400 shadow px-4 py-2 rounded text-gray-700 transition duration-300 ease-in-out">Share</button>
              <button className="bg-primary hover:bg-secondary shadow px-4 py-2 rounded text-white transition duration-300 ease-in-out">Subscribe</button>
            </div>
            <div className="flex md:flex-row flex-col justify-between items-center space-y-2 md:space-y-0 mt-6">
              <div className="flex space-x-4">
                <button className="bg-accent hover:bg-darkAccent shadow px-4 py-2 rounded text-white transition duration-300 ease-in-out">Comment</button>
                <button className="bg-gray-300 hover:bg-gray-400 shadow px-4 py-2 rounded text-gray-700 transition duration-300 ease-in-out">Report</button>
              </div>
              <div className="flex space-x-4">
                <button className="bg-primary hover:bg-secondary shadow px-4 py-2 rounded text-white transition duration-300 ease-in-out">Save</button>
                <button className="bg-gray-300 hover:bg-gray-400 shadow px-4 py-2 rounded text-gray-700 transition duration-300 ease-in-out">More</button>
              </div>
            </div>


            {/* Comments section */}
            <div className="mt-6">
              <h2 className="font-semibold text-xl">Comments</h2>
              <form onSubmit={handleCommentSubmit} className="flex mt-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-grow p-2 border rounded-l-lg"
                  required
                />
                <button type="submit" className="bg-primary px-4 rounded-r-lg text-white">Submit</button>
              </form>
              <div className="mt-4">
                {comments.map((comment) => (
                  <div key={comment._id} className="py-2 border-b">
                    <p className="font-semibold">{comment.user.username || comment.user.name}</p>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoDetails;
