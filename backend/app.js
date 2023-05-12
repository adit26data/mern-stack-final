const express = require('express')
const app = express()
const errorMiddleware = require('./middleware/error')
app.use(express.json());

//route imports 
const product = require('./routes/productRoute');

//route imports
app.use('/api/v1', product);


//middleware for errors
app.use(errorMiddleware);

module.exports = app