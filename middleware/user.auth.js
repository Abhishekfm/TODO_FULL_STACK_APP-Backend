const JWT = require("jsonwebtoken")
const User = require("../models/user.schema")
const customError = require("../utils/custom.error")

exports.isLoggedIn = async (req, res, next) => {
    let token
    console.log(req.cookies.token);
    if(req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))){
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }

    if(!token){
        throw new customError("Not authorized to access this route", 401)
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        console.log(`${decoded} yeh auth Walla`);
        console.log(decoded._id);
        req.user = await User.findById(decoded._id, "_id name email")
        // console.log(req.user);
        next()
    } catch (err) {
        throw new customError("Not authorized to access this route", 401)
    }
}