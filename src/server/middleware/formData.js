
const multer = require('multer')
const multerMW = multer();
const path = require('path')
const { createAppError } = require("../utils/error");
const { HttpStatus } = require("../utils/httpCodes");
const { invalidImageType } = require("../../constant/errors");

const gettingPath = (req) => {

  let convenientPath;

  if (req.url.includes('/api/admin/website-management/testimonials')) {
    convenientPath = path.join(__dirname, "..", "..", "..", "uploads", "testimonial");
  } else   if (req.url.includes('/api/admin/website-management/transformations')) {
    convenientPath = path.join(__dirname, "..", "..", "..", "uploads", "transformation");
  }else if (req.url.includes('/api/admin/clients-management') || req.url.includes('/api/client/sign-in')) {
    convenientPath = path.join(__dirname, "..", "..", "..", "uploads", "client");
  } else if (req.url.includes('/api/admin/admins')) {
    convenientPath = path.join(__dirname, "..", "..", "..", "uploads", "admin");
  } else if (req.url.includes('/api/admin/website-management/products')) {
    convenientPath = path.join(__dirname, "..", "..", "..", "uploads", "product");
  } else if (req.url.includes('/api/admin/website-management/packages')) {
    convenientPath = path.join(__dirname, "..", "..", "..", "uploads", "package");
  } else if (req.url.includes('/api/admin/website-management/sections')) {
    convenientPath = path.join(__dirname, "..", "..", "..", "uploads", "section");
  } else if (req.url.includes('/api/admin/website-management/certifications')) {
    convenientPath = path.join(__dirname, "..", "..", "..", "uploads", "certification");
  } else if (req.url.includes('/api/admin/website-management/blogs')) {
    convenientPath = path.join(__dirname, "..", "..", "..", "uploads", "blog");
  }


  return convenientPath;
}


// Multer storage configuration
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, gettingPath(req)); // Destination folder for uploaded files
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  },
});



// Define file filter function based on MIME types
const imageFilter = function (req, file, cb) {
  // Check MIME type
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png']; // Add more MIME types as needed
  if (allowedMimeTypes.includes(file.mimetype)) {
    // Accept the file
    cb(null, true);
  } else {

    // Reject the file
    return cb(createAppError("the type of the image not allowed", HttpStatus.NotFound, invalidImageType));
  }
};


// Multer instances
const imageUpload = multer({
  storage: imageStorage, fileFilter: imageFilter, limits: {
    fileSize: 1024 * 1024 * 5 // 5MB file size limit
  }
});
const formDataMiddleware = (req, res, next) => {
  if (gettingPath(req)) {

    // Apply single file upload middleware to store products files
    imageUpload.single('image')(req, res, next);
  } else {
    // Apply any file upload middleware for other URLs
    multerMW.any()(req, res, next);
  }
};



module.exports = formDataMiddleware