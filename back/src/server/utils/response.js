const codeToString = require("./httpCodes").codeToString;

const successResponse = ( res ,data ,httpCode = 200 , arr=[] ) => {
  const response= {
    success: true,
    message: codeToString(httpCode),
    httpCode,
    data,
  }
  if(arr.length){
    arr.forEach((item)=>{
      if ( Object.getPrototypeOf(item).isPrototypeOf(Object)){
        response[Object.keys(item)[0]] = item[Object.keys(item)[0]]
      }
    })
  }
  return res.status(httpCode).json(response);
};

module.exports = { successResponse };
