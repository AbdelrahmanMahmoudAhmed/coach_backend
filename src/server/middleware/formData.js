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

const adminStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "..", "uploads", "admin")); // Destination folder for uploaded files
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  },
});
const clientStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "..", "uploads", "client")); // Destination folder for uploaded files
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  },
});
const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "..", "uploads", "product")); // Destination folder for uploaded files
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
const transformationsUpload = multer({ storage: transformationsStorage, fileFilter: imageFilter });
const adminUpload = multer({ storage: adminStorage, fileFilter: imageFilter });
const clientUpload = multer({ storage: clientStorage, fileFilter: imageFilter });
const productUpload = multer({ storage: productStorage, fileFilter: imageFilter });

const formDataMiddleware = (req, res, next) => {
  if (req.url.includes('/api/admin/website-management/transformations')) {
    // Apply single file upload middleware to store transformations files
    transformationsUpload.single('image')(req, res, next);
  } else if (  req.url.includes('/api/admin/admins')) {
    // Apply single file upload middleware to store admins files
    adminUpload.single('image')(req, res, next);
  }  else if (  (req.url.includes('/api/admin/clients-management') )|| ( req.url.includes('/api/auth/sign-in') )|| ( req.url.includes('/api/me')   )) {
    // Apply single file upload middleware to store clients files
    clientUpload.single('image')(req, res, next);
  } else if (  req.url.includes('/api/admin/products')) {
    // Apply single file upload middleware to store products files
    productUpload.single('image')(req, res, next);
  }else {
    // Apply any file upload middleware for other URLs
    multerMW.any()(req, res, next);
  }
  
};



module.exports = formDataMiddleware