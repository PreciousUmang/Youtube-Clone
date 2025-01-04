import express from 'express';
import { getVideos, getVideoById, updateVideo, deleteVideo, uploadVideo } from '../Controller/videoController.js';
import { authenticate } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Video routes
router.post('/videos', authenticate,uploadVideo); 
router.get('/videos', getVideos);
router.get('/videos/:id', getVideoById);
router.put('/videos/:id', authenticate, updateVideo);
router.delete('/videos/:id', authenticate, deleteVideo);

export default router;
