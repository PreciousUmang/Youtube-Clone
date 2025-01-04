import Comment from '../Model/Comment.js';
import Video from '../Model/Video.js';

export const getComments = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const comments = await Comment.find({ videoId: videoId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
};

export const postComment = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    const newComment = new Comment({
      text,
      videoId: videoId,
      user: req.userId,
    });

    const savedComment = await newComment.save();
    const populatedComment = await Comment.findById(savedComment._id).populate('user', 'username');
    res.status(201).json(populatedComment);
  } catch (error) {
    console.error('Error submitting comment:', error);
    res.status(500).json({ error: 'Error submitting comment' });
  }
};