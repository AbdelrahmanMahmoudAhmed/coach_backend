const fs = require('fs');



const clearImage = ( filePath ) => {
    fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted successfully');
      });
}

module.exports = clearImage
