const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to /uploads
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}-${randomString}${ext}`); // E.g., 16987654321-abcdef.jpg
  },
});

// File filters
const imageFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  const blockedTypes = ['application/javascript', 'text/javascript', 'application/x-msdownload', 'application/octet-stream'];
  if (blockedTypes.includes(file.mimetype)) {
    return cb(new Error('Scripts and executable files are not allowed'), false);
  }
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, PNG, and GIF files are allowed'), false);
  }
};

const videoFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/quicktime'];
  const blockedTypes = ['application/javascript', 'text/javascript', 'application/x-msdownload', 'application/octet-stream'];
  if (blockedTypes.includes(file.mimetype)) {
    return cb(new Error('Scripts and executable files are not allowed'), false);
  }
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only MP4 and MOV files are allowed'), false);
  }
};

// Multer instances
const uploadImage = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
});

const uploadVideo = multer({
  storage,
  fileFilter: videoFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
});

module.exports = { uploadImage, uploadVideo };