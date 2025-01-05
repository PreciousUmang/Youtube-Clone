import Comment from '../Model/Comment.js'; 
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};
