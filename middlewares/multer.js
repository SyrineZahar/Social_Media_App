const multer = require("multer");
const path = require("path");

// Configure storage for images and videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create directories for images and videos if not already there
    const fileType = file.mimetype.startsWith("image/") ? "images" : "videos";
    cb(null, `uploads/${fileType}`);
  },
  filename: (req, file, cb) => {
    // Save the file with the original name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer file filter for validating file type (image/video)
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
  const allowedVideoTypes = ["video/mp4", "video/avi"];
  
  if (file.mimetype.startsWith("image/") && allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.mimetype.startsWith("video/") && allowedVideoTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos are allowed."), false);
  }
};

// Initialize Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
