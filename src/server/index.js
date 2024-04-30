const express = require('express')
const { sequelize } = require('../models');

const app = express()
async function getTables() {
    // await sequelize.sync({ alter : true})
    await sequelize.authenticate()
}

app.listen(8080, async () => {
    getTables();
    console.log("app is listening on port 8080")
})



