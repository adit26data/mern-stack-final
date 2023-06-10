const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');
const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
dotenv.config({ path: "backend/config/config.env" });
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


//route imports 
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoutes');
const payment = require("./routes/paymentRoute")
//route imports
app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment)


//middleware for errors
app.use(errorMiddleware);

module.exports = app