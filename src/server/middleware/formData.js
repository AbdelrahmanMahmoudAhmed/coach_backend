const multer = require('multer')
const multerMW = multer();
const path = require('path')




// Multer storage configuration
const transformationsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "..", "uploads", "transformation")); // Destination folder for uploaded files
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  },
});


// Define file filter function based on MIME types
const imageFilter = function (req, file, cb) {
  // Check MIME type
  const allowedMimeTypes = ['image/jpeg', 'image/jpg']; // Add more MIME types as needed
  if (allowedMimeTypes.includes(file.mimetype)) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error('Invalid file type. Only JPEG files are allowed.'));
  }
};


// Multer instances
const singleUpload = multer({ storage: transformationsStorage, fileFilter: imageFilter });

const formDataMiddleware = (req, res, next) => {
  if (req.url.includes('/api/admin/website-management/transformations') || 
  req.url.includes('/api/admin/admins')) {
    // Apply single file upload middleware if the request URL is '/api/transformations'
    singleUpload.single('image')(req, res, next);
  } else {
    // Apply any file upload middleware for other URLs
    multerMW.any()(req, res, next);
  }
};



module.exports = formDataMiddleware