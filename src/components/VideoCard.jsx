import { useEffect, useState } from 'react';
import axios from 'axios';

const VideoCard = ({ video }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/videos/${video._id}/comments`);
        setComments(response.data);
      } catch (err) {
        console.error('Error fetching comments', err);
      }
    };
    fetchComments();
  }, [video._id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/videos/${video._id}/comments`, {
        text: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment', err);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <img src={video.thumbnailUrl} alt={video.title} className="rounded-md w-full h-48 object-cover" />
      <h3 className="mt-2 font-semibold text-lg">{video.title}</h3>
      <p className="text-gray-600 text-sm">{video.channelName}</p>
      <p className="text-gray-500 text-sm">{video.views} views</p>

      <div className="mt-4">
        <h4 className="font-semibold">Comments ({comments.length})</h4>
        <div className="space-y-2 mt-2">
          {comments.map((comment) => (
            <div key={comment._id} className="py-2 border-b">
              <p className="text-sm">{comment.text}</p>
            </div>
          ))}
        </div>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            className="p-2 border rounded-md w-full"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="3"
          />
          <button
            type="submit"
            className="bg-blue-500 mt-2 px-4 py-2 rounded-md text-white"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoCard;
