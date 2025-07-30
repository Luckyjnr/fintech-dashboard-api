const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { uploadImage, uploadVideo } = require('../middleware/upload');
const { uploadImage: uploadImageController, uploadVideo: uploadVideoController } = require('../controllers/profileController');

router.post('/upload-image', protect, uploadImage.single('file'), uploadImageController);
router.post('/upload-video', protect, uploadVideo.single('file'), uploadVideoController);

module.exports = router;