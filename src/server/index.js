const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize } = require('../models');
const setupApiRouters = require('./routes');
const app = express();

const PORT = process.env.PORT


/* ------------------------------- Middlewares ------------------------------- */

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




app.listen(PORT, async () => {
    getTables();
    console.log("app is listening on port 8080");
})



