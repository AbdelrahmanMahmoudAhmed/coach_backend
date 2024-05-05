const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const multer  = require('multer')
const { sequelize } = require('../models');
const setupApiRouters = require('./routes');
const errorMiddleware = require('./middleware/errorHandler')
const app = express();
const multerMW = multer();



const PORT = process.env.PORT


/* ------------------------------- Middlewares ------------------------------- */

app.use(bodyParser.json()); // application/json

app.use(multerMW.any()); // Middleware to parse form data


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


/* --------------------------------- Router --------------------------------- */
setupApiRouters(app);

/* ------------------------------- ORM Connection ------------------------------- */
async function getTables() {
    // await sequelize.sync({ alter : true})
    await sequelize.authenticate()
};

/* ---------------------------------- Error Handling --------------------------------- */

app.use(errorMiddleware)



app.listen(PORT, async () => {
    getTables();
    console.log(`app is listening on port ${ PORT } `);
})



