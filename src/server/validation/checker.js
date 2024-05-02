const { validationResult } = require('express-validator');


const validationChecker = async (req, res) => {
    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
        // Respond with 400 status code and validation errors
        throw {
            message: "validation error",
            status: false,
            code: 0,
            errors: errors.array()
        };
    }else{
       
        return true
    }
}


module.exports = validationChecker


