import express from 'express';
import { createChannel, getChannels, getChannelDetails, updateChannel, deleteChannel } from '../Controller/channelController.js';

const router = express.Router();

router.post('/create', createChannel);
router.get('/', getChannels);
router.get('/:channelId', getChannelDetails);
router.put('/:channelId', updateChannel);
router.delete('/:channelId', deleteChannel);

export default router;
