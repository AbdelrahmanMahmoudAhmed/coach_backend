
 const {serverError } = require('../utils/error')
 const clearImage = require("../utils/clearImage");

 const errorMiddleware  = (err, req, res, next) => {
    console.log("err>>>>" ,err)

    if(req.file?.path){
      // cleare the image
      clearImage(req.file?.path)
    }

    if(!err.httpCode)  err = serverError;
       res.status(err.httpCode || 500).json(err);
  
  };


module.exports = errorMiddleware
 