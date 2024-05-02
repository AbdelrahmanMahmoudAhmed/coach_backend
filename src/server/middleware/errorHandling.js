
 function errorMiddleware(app) {
  const errorHandler = async (err, req, res, next) => {
    console.log("err handddl")
      res.status(err.httpCode).json(err.message);
  
  };
  app.use(errorHandler);
}

module.exports = errorMiddleware
