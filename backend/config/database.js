const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }).then((data) => {
        console.log(`mongo db server connected with server: ${data.connection.host}`);
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = connectDatabase