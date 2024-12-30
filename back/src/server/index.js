const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize } = require('../models');
const setupApiRouters = require('./routes');
const errorMiddleware = require('./middleware/errorHandler')
const formDataMiddleware = require('./middleware/formData')
const cors = require('cors');
const app = express();


const PORT = process.env.PORT



/* ------------------------------- Static Files ------------------------------- */

app.use('/u', express.static(path.join(__dirname, ".." ,"..", 'uploads')));


/* ------------------------------- Middlewares ------------------------------- */
// to handle CORS origin 

const corsOptions = {

    origin: (origin, callback) => {
        callback(null, origin);
      }, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    allowedHeaders: 'Content-Type, Authorization', 
  };
  app.use(cors(corsOptions));



app.use(bodyParser.json()); // application/json
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



