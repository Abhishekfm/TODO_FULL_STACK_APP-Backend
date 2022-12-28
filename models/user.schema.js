const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,"Name is required"]
        },
        email:{
            type:String,
            required:[true,"Email is required"],
            unique:true
        },
        password:{
            type:String,
            required:[true,"Password is required"],
            minLength: [8, "password must be at least 8 characters"]
        }
    }
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
})

userSchema.methods = {
    getJwtToken: function () {
        return JWT.sign(
            {
                _id: this._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    },
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    }
}

module.exports = mongoose.model("User", userSchema);