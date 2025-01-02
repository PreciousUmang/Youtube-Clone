import express from 'express';
import { createChannel, getChannels, getChannelDetails, updateChannel, deleteChannel } from '../Controller/channelController.js';

const router = express.Router();

router.post('/create', createChannel);
router.get('/channels', getChannels);
router.get('/channels/:channelId', getChannelDetails);
router.put('/channels/:channelId', updateChannel);
router.delete('/channels/:channelId', deleteChannel);

export default router;
