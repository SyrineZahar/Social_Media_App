const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); 
    cb(null, Date.now() + ext);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    const allowedImageTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/x-matroska'];

    if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      console.log("Only PNG, JPG, JPEG, MP4, AVI, MKV files are supported");
      callback(null, false); 
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 10 
  }
});

module.exports = upload;
