
 const {serverError } = require('../utils/error')
 const clearImage = require("../utils/clearImage");

 const errorMiddleware  = (err, req, res, next) => {
    console.log("err>>>>" ,err)

    if(req.file?.path){
      // cleare the image ( single file )
      clearImage(req.file?.path)
    }


    // clear imges ( multiple files)
    if(req.files){

      const keys = Object.keys(req.files)

      if(keys.length){
        keys.forEach((item)=>{
          req.files?.[item][0]?.path &&  clearImage( req.files?.[item][0]?.path )
         })
      }

   
    }

    if(!err.httpCode)  err = serverError;
       res.status(err.httpCode || 500).json(err);
  
  };


module.exports = errorMiddleware
 