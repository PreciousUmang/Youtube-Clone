import Video from '../Model/Video.js';
import Channel from '../Model/Channel.js';

// Upload a new video
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, category, channelId } = req.body;

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    const newVideo = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      uploader: req.userId,
      channelId: channel._id,
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Failed to upload video' });
  }
};

// Get all videos
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('uploader', 'username avatar').sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a specific video by ID
export const getVideoById = async (req, res) => {
  try {
const video = await Video.findById(req.params.id)
  .populate('uploader', 'username avatar')
.populate('channelId', 'channelName subscribers'); // Populate channelId to get channel name and subscribers
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Fetch comments for a specific video
export const getComments = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId).populate('comments.user', 'username');
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(video.comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};

// Update a video
export const updateVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, category, channelId } = req.body;

    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.title = title || video.title;
    video.description = description || video.description;
    video.videoUrl = videoUrl || video.videoUrl;
    video.thumbnailUrl = thumbnailUrl || video.thumbnailUrl;
    video.category = category || video.category; // Ensure category is included
    video.channelId = channelId || video.channelId;

    await video.save();

    res.status(200).json({ message: 'Video updated successfully', video });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a video
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    await video.remove();

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
