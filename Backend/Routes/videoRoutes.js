import express from 'express';
import { createVideo, getVideos, getVideoById, updateVideo, deleteVideo } from '../Controller/videoController.js';
import { authenticate } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Video routes
router.post('/videos', createVideo); 
router.get('/videos', getVideos);
router.get('/videos/:id', getVideoById);
router.put('/videos/:id', authenticate, updateVideo);
router.delete('/videos/:id', authenticate, deleteVideo);

export default router;
