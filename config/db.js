const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const connect_to_db = () => {
    mongoose.connect(MONGO_URL)
    .then((conn)=>{
        console.log(`Connected DataBase: ${conn.connection.host}`);})
    .catch((err)=>{
        console.log(err.message);
        process.exit(1);
    });
}

module.exports = connect_to_db;