import Channel from '../Model/Channel.js'; 
import User from '../Model/User.js'; 

export const createChannel = async (req, res) => {
  const { channelName, description, owner, banner } = req.body;
  console.log('Request body:', req.body); 
  try {
    const newChannel = new Channel({
      channelName,
      description,
      owner,
      banner,
    });

    // Save the new channel
    await newChannel.save();

    await User.findByIdAndUpdate(owner, {
      $push: { channels: newChannel._id },
    });

    res.status(201).json({ message: 'Channel created successfully!', channel: newChannel });
  } catch (error) {
    console.error('Error creating channel:', error); 
    res.status(500).json({ message: 'Error creating channel', error: error.message });
  }
};

// Get the authenticated user's channel
export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.userId });
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    res.status(200).json(channel);
  } catch (error) {
    console.error('Error fetching channel:', error);
    res.status(500).json({ message: 'Failed to fetch channel' });
  }
};

// Get all channels
export const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find().populate('owner', 'username email').populate('videos');
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching channels', error: error.message });
  }
};

// Get a specific channel's details
export const getChannelDetails = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId)
      .populate('owner', 'username email')
      .populate('videos'); 

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching channel details', error: error.message });
  }
};

// Update channel details
export const updateChannel = async (req, res) => {
  const { channelId } = req.params;
  const { channelName, description, banner } = req.body;

  try {
    const updatedChannel = await Channel.findByIdAndUpdate(
      channelId,
      { channelName, description, banner },
      { new: true } 
    );

    if (!updatedChannel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    res.status(200).json(updatedChannel);
  } catch (error) {
    res.status(500).json({ message: 'Error updating channel', error: error.message });
  }
};

// Delete a channel
export const deleteChannel = async (req, res) => {
  const { channelId } = req.params;

  try {
    const deletedChannel = await Channel.findByIdAndDelete(channelId);

    if (!deletedChannel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    res.status(200).json({ message: 'Channel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting channel', error: error.message });
  }
};
