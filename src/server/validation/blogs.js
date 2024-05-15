const { checkSchema } = require('express-validator');


const addBlogValidation = checkSchema({

    titleAr: {
        in: ['body'],
        optional: false,
        trim: true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'titleAr contain at least 3 chars '
        }
    },
    titleEn: {
        in: ['body'],
        optional: false,
        trim: true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'titleEn contain at least 3 chars '
        }
    },
    contentAr: {
        in: ['body'],
        optional: false,
        trim: true,
        isLength: {
            options: { min: 7 },
            errorMessage: 'contentAr contain at least 7 char '
        }
    },
    contentEn: {
        in: ['body'],
        optional: false,
        trim: true,
        isLength: {
            options: { min: 7 },
            errorMessage: 'contentEn contain at least 7 char '
        }
    },
    type: {
        in: ['body'],
        optional: true,
        trim: true,
        isIn: {
            options: [['pic', 'video']],
            errorMessage: 'must be pic or video'
        },
    },
    link: {
        in: ['body'],
        optional: true,
        trim: true,
        isURL: true,
        errorMessage: 'must be a valid url'
    },

});


const updateBlogValidation = checkSchema({

    titleAr: {
        in: ['body'],
        optional: true,
        trim: true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'titleAr contain at least 3 chars '
        }
    },
    titleEn: {
        in: ['body'],
        optional: true,
        trim: true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'titleEn contain at least 3 chars '
        }
    },
    contentAr: {
        in: ['body'],
        optional: true,
        trim: true,
        isLength: {
            options: { min: 7 },
            errorMessage: 'contentAr contain at least 7 char '
        }
    },
    contentEn: {
        in: ['body'],
        optional: true,
        trim: true,
        isLength: {
            options: { min: 7 },
            errorMessage: 'contentEn contain at least 7 char '
        }
    },
    type: {
        in: ['body'],
        optional: true,
        trim: true,
        isIn: {
            options: [['pic', 'video']],
            errorMessage: 'must be pic or video'
        },
    },
    link: {
        in: ['body'],
        optional: true,
        trim: true,
        isURL: true,
        errorMessage: 'must be a valid url'
    },
});


const validateType = (req, res, next) => {
    if (req.body.type !== 'pic'){
        req.body.image = null;
        req.file = null;
    }

    
    next()
}


module.exports = { addBlogValidation, updateBlogValidation , validateType }