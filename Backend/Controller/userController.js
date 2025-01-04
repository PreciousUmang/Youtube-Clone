import User from '../Model/User.js';

export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.userId); 
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...userData } = user.toObject();
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
