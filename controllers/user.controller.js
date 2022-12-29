const User = require("../models/user.schema");
const customError = require("../utils/custom.error")

const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite :'None',
    secure : true
    //could be in a separate file in utils
}


exports.createUser = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        throw new customError("Enter All your Details", 401);
    }
    const userExist = await User.findOne({email})

    if(userExist){
        throw new customError("Email Already Exist", 401);
    }
    const user = await User.create({
        name,
        email,
        password
    });
    const token  = await user.getJwtToken();
    console.log(user);
    user.password = undefined;
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
        success:true,
        token,
        user
    })
}


exports.login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new customError("Provide all details", 401)
    }
    const userExist = await User.findOne({email})
    if(!userExist){
        throw new customError("User does not Exist", 401);
    }
    const matched = await userExist.comparePassword(password)
    if(!matched){
        throw new customError("Credentials are Wrong pswd", 401);
    }
    const token = await userExist.getJwtToken()
    userExist.password = undefined;
    res.cookie("token", token, cookieOptions);
    console.log(req.cookies.token )
    // console.log({
    //     success:true,
    //     token,
    //     userExist
    // });
    res.status(201).json({
        success:true,
        token,
        userExist
    })
}

exports.logout = async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite :'None',
        secure : true
    })
    res.clearCookie("token")
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
}


exports.getDashboard = (req, res) => {
    const { user } = req;
    console.log(user);
    console.log("I am inside getDashboard");
    if(!user || !user.name || !user.email || !user._id){
        throw new customError("Not authorized to access this route", 401)
    }
    res.status(201).json({
        success: true,
        name: user.name,
        email: user.email,
        ID:  user._id
    })
}