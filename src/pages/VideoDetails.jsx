import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment, deleteComment, editComment } from '../redux/videoActions';

const VideoDetails = () => {
  const video = useSelector((state) => state.video.selectedVideo);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const dispatch = useDispatch();

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment(video.videoId, newComment));
      setNewComment('');
    }
  };

  const handleEditComment = (commentId) => {
    if (editedComment.trim()) {
      dispatch(editComment(video.videoId, commentId, editedComment));
      setEditingCommentId(null);
      setEditedComment('');
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(video.videoId, commentId));
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <video src={video.url} controls className="w-full h-auto"></video>
      </div>
      <h1 className="mb-2 font-bold text-2xl">{video.title}</h1>
      <p className="mb-4 text-gray-600">{video.description}</p>
      <div className="flex gap-4 mb-4">
        <button className="bg-blue-500 px-4 py-2 rounded text-white">Like</button>
        <button className="bg-red-500 px-4 py-2 rounded text-white">Dislike</button>
      </div>
      <div>
        <h2 className="mb-2 font-bold text-xl">Comments</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            className="mb-2 px-4 py-2 border rounded w-full"
          />
          <button onClick={handleAddComment} className="bg-accent px-4 py-2 rounded text-white">
            Add Comment
          </button>
        </div>
        <ul>
          {video.comments.map((comment) => (
            <li key={comment.commentId} className="mb-2">
              {editingCommentId === comment.commentId ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    className="px-4 py-2 border rounded w-full"
                  />
                  <button
                    onClick={() => handleEditComment(comment.commentId)}
                    className="bg-green-500 px-4 py-2 rounded text-white"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditedComment('');
                    }}
                    className="bg-gray-500 px-4 py-2 rounded text-white"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p>{comment.text}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingCommentId(comment.commentId);
                        setEditedComment(comment.text);
                      }}
                      className="bg-yellow-500 px-4 py-2 rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.commentId)}
                      className="bg-red-500 px-4 py-2 rounded text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoDetails;
