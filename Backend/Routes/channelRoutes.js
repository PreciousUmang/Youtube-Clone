import express from 'express';
import { createChannel, getChannels, getChannelDetails, updateChannel, deleteChannel, getMyChannel } from '../Controller/channelController.js';
import { authenticate } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', createChannel);
router.get('/', getChannels);
router.get('/my', authenticate, getMyChannel);
router.get('/:channelId', getChannelDetails);
router.put('/:channelId', updateChannel);
router.delete('/:channelId', deleteChannel);

export default router;
