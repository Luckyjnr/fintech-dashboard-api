const User = require('../models/User');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const userId = req.user._id;
    const profileImagePath = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: profileImagePath },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Image uploaded successfully',
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const userId = req.user._id;
    const profileVideoPath = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { profileVideo: profileVideoPath },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Video uploaded successfully',
      profileVideo: user.profileVideo,
    });
  } catch (error) {
    console.error('Video upload error:', error);
    res.status(400).json({ message: error.message });
  }
};