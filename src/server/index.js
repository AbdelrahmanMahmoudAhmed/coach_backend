const express = require('express')
const path = require('path');
// const bodyParser = require('body-parser');
const { sequelize } = require('../models');
const setupApiRouters = require('./routes');
const errorMiddleware = require('./middleware/errorHandler')
const formDataMiddleware = require('./middleware/formData')
const cors = require('cors');
const app = express();


const PORT = process.env.PORT
const CLIENT_BASE = process.env.CLIENT_BASE_URL



/* ------------------------------- Static Files ------------------------------- */

app.use('/u', express.static(path.join(__dirname, ".." ,"..", 'uploads')));


/* ------------------------------- Middlewares ------------------------------- */
// to handle CORS origin 

const corsOptions = {

    // origin: CLIENT_BASE, // to allow just one of frontends URL


    origin: (origin, callback) => {
        callback(null, origin);
      }, // to allow to all frontend
      
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
  };
  app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//     );
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// app.use(bodyParser.json()); // application/json
app.use(formDataMiddleware); // adding form data according to the request route


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



