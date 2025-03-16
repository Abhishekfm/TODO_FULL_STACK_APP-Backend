require("dotenv").config();
const cookieParser= require("cookie-parser");
const connect_to_db = require("./config/db");
// const cors = require('cors')
const express = require("express")
const userRoutes = require('./routes/user.route');
const todoRoutes = require("./routes/todo.route");
const taskRoutes = require("./routes/task.route");

// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
// header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(cookieParser());

// app.use(cors({
//     origin:"http://localhost:3000"
// }))
const cors = require('cors');
const corsOptions ={
    origin:"https://todo-full-stack-app-frontend.vercel.app", 
    credentials:true,            //access-control-allow-credentials:true
    optionsSuccessStatus:200,
    allowedHeaders:['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));

connect_to_db();

app.use("/api",userRoutes)
app.use("/u", todoRoutes)
app.use("/u",taskRoutes)

module.exports = app;
