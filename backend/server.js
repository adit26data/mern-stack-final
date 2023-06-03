const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require("./config/database")
const cloudinary = require('cloudinary')
//handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`error due to uncaught exceptions `);
    process.exit(1);
})




//config
dotenv.config({ path: "backend/config/config.env" });
//connect the database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
})



const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})


//unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting the server down due to unhandled server rejection`);
    server.close(() => {
        process.exit(1);
    });
})