
const multer = require('multer')
const multerMW = multer();
const { createAppError } = require("../utils/error");
const { HttpStatus } = require("../utils/httpCodes");
const { invalidImageType } = require("../../constant/errors");
const gettingPath  = require("../utils/handleFileData")






// Multer storage configuration
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, gettingPath(req).path); // Destination folder for uploaded files
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  },
});



// // Define file filter function based on MIME types
// const imageFilter = function (req, file, cb) {
//   // Check MIME type
//   const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png' , 'image/svg' , 'video/mp4']; // Add more MIME types as needed
//   if (allowedMimeTypes.includes(file.mimetype)) {
//     // Accept the file
//     cb(null, true);
//   } else {
//     // Reject the file
//     return cb(createAppError("the type of the image not allowed", HttpStatus.NotFound, invalidImageType));
//   }
// };

const imageFilter = function (req, file, cb) {
  const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg'];
  const videoMimeTypes = ['video/mp4'];

  if (imageMimeTypes.includes(file.mimetype)) {
    // Accept images
    cb(null, true);
  } else if (videoMimeTypes.includes(file.mimetype)) {
    // Accept videos
    cb(null, true);
  } else {
    // Reject the file
    return cb(createAppError("The file type is not allowed", HttpStatus.NotFound, invalidImageType));
  }
};



// Multer instances
const imageUpload = multer({
  storage: imageStorage, fileFilter: imageFilter, limits: {
    // fileSize: 1024 * 1024 * 5 // 5MB file size limit
  }
});
const formDataMiddleware = (req, res, next) => {

    const fileInfo = gettingPath(req)
  
  if (fileInfo.path && fileInfo.data) {

    if(fileInfo.isSingle){
      imageUpload.single(fileInfo.data)(req, res, next);

    }else{
      imageUpload.fields(fileInfo.data)(req, res, next);
    }

    // Apply single file upload middleware to store products files
    // imageUpload.single('image')(req, res, next);
   
  } else {
    // Apply any file upload middleware for other URLs
    multerMW.any()(req, res, next);
  }
};



module.exports = formDataMiddleware