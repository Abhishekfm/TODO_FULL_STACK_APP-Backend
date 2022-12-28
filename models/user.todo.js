const mongoose = require("mongoose");

const userTodo = mongoose.Schema(
    {
        title: {
            type: String,
            required:[true,"Title is required"]
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        tasks: [{
            taskName: String,
            done:{
                type:Boolean,
                default:false,
            }
        }]
    },
    {
        timestamps:true
    }
)


module.exports = mongoose.model("Todo", userTodo)