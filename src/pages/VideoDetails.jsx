import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import VideoPlayer from '../components/VideoPlayer';

const VideoDetails = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]); // State for comments
  const [newComment, setNewComment] = useState(''); // State for new comment input

  // Fetch the video data
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoResponse = await axios.get(`/videos/${videoId}`);
        setVideo(videoResponse.data);
        setLoading(false);
        fetchComments(); // Fetch comments when video data is loaded
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
    console.log("Submitting comment:", newComment); // Log the comment being submitted
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await axios.post(`/${videoId}/comments`, { text: newComment }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      setComments((prevComments) => [response.data, ...prevComments]); // Add new comment to the state
      setNewComment(''); // Clear the input field
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
              <button className="bg-accent hover:bg-darkAccent shadow px-4 py-2 rounded text-white transition duration-300 ease-in-out">Like</button>
              <button className="bg-gray-300 hover:bg-gray-400 shadow px-4 py-2 rounded text-gray-700 transition duration-300 ease-in-out">Share</button>
              <button className="bg-primary hover:bg-secondary shadow px-4 py-2 rounded text-white transition duration-300 ease-in-out">Subscribe</button>
            </div>
            <div className="flex justify-between items-center mt-6">
              <div className="flex space-x-4">
                <button className="bg-accent hover:bg-darkAccent shadow px-4 py-2 rounded text-white transition duration-300 ease-in-out">Comment</button>
                <button className="bg-gray-300 hover:bg-gray-400 shadow px-4 py-2 rounded text-gray-700 transition duration-300 ease-in-out">Report</button>
              </div>
              <div className="flex space-x-4">
                <button className="bg-primary hover:bg-secondary shadow px-4 py-2 rounded text-white transition duration-300 ease-in-out">Save</button>
                <button className="bg-gray-300 hover:bg-gray-400 shadow px-4 py-2 rounded text-gray-700 transition duration-300 ease-in-out">More</button>
              </div>
            </div>
            {/* Comment Section */}
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
                    <p className="font-semibold">{comment.user.name}</p>
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
