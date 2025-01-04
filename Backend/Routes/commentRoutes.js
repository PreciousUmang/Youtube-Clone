import express from 'express';
import { getComments, postComment } from '../Controller/commentController.js';
import { authenticate } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/:videoId/comments', getComments);
router.post('/:videoId/comments', authenticate, postComment);

export default router;
