import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from '../api/axios';

const VideoPlayer = ({ videoUrl, title, description, videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(''); 

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      const response = await axios.post(`http://localhost:5000/api/videos/${videoId}/comments`, {
        text: newComment,
      });
      setComments((prevComments) => [{ user: { username: response.data.user.username }, ...response.data }, ...prevComments]);
      setNewComment(''); 
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  useEffect(() => {
const fetchComments = async () => {
  console.log(`Fetching comments for video ID: ${videoId}`);
      if (!videoId) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/${videoId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [videoId]);

  return (
    <div className="video-player-container">
      <ReactPlayer url={videoUrl} controls={true} className="rounded-lg" />
      <h2 className="mt-4 font-bold text-xl">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <div className="mt-4 comments-section">
        <h3 className="font-semibold">Comments:</h3>
        {comments.map(comment => (
          <div key={comment._id} className="comment">
            <p className="font-bold">{comment.user ? (comment.user.username || 'Unknown User') : 'Unknown User'}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;