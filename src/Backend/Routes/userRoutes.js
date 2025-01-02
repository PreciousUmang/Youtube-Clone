import express from 'express';
import { authenticate } from '../Middleware/authMiddleware.js';
import { getUserData } from '../Controller/userController.js';

const router = express.Router();

router.get('/user-data', authenticate, getUserData); // Protected route

export default router;
