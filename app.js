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
    origin:'https://todo-full-stack-app-frontend.vercel.app', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods:['GET', 'PUT', 'POST'],
    allowedHeaders:['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})
connect_to_db();

app.use("/api",userRoutes)
app.use("/u", todoRoutes)
app.use("/u",taskRoutes)

module.exports = app;