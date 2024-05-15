
 const {serverError } = require('../utils/error')

 const errorMiddleware  = (err, req, res, next) => {
    console.log("err" ,err)

    if(!err.httpCode)  err = serverError

    
       res.status(err.httpCode || 500).json(err);
  
  };


module.exports = errorMiddleware
