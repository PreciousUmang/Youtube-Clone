import express from 'express';
import { authenticate } from '../Middleware/authMiddleware.js';
import { getUserData } from '../Controller/userController.js';
import { login, signup } from '../Controller/authController.js'; 
const router = express.Router();

router.get('/user-data', authenticate, getUserData);
router.post('/signup', signup);
router.post('/login', login);

export default router;