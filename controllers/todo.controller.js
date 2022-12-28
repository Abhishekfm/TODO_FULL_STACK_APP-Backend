const { search } = require("../app")
const Todo = require("../models/user.todo")
const customError = require("../utils/custom.error")

exports.createTodo = async (req, res) => {
    try {
        const { user } = req
        if(!user){
            throw new customError("Cannot acess this page", 401)
        }
        const { title } = req.body
        if(!title){
            throw new customError("Title Cannot be Empty.",401)
        }
        const todo = await new Todo({
            title: title,
            userId: user._id
        })
        const savedTodo = await todo.save();
        res.status(200).json({
            success:true,
            savedTodo
        })

    } catch (error) {
        throw new customError("Cannot Access This Page",401)
    }
}

exports.getTodo = async (req, res) => {
    try {
        const { user } = req
        if(!user){
            throw new customError("You are not allowed to access this route", 401)
        }
        const userId = user._id
        const allTodos = await Todo.find({userId})
        res.status(200).json({
            success:true,
            userId,
            allTodos
        })
    } catch (error) {
        throw new customError("cannot get get Todo", 402)
    }
}

exports.editTodo = async (req, res) => {
    try {
        const todoId = req.params.id
        const {title} = req.body
        if(!todoId || !title){
            throw new customError("Wrong route", 401)
        }
        const filter = {_id:todoId}
        const update = {title:title}
        const todo = await Todo.findOneAndUpdate(filter, update)
        res.status(201).send({
            success:true,
            todo
        })
    } catch (error) {
        console.log(error);
        throw new customError("Wrong Route", 402)
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id
        if(!todoId){
            throw new customError("Wrong route", 401)
        }
        const filter = {_id:todoId}
        const todo = await Todo.findOneAndDelete(filter)
        res.status(201).send({
            success:true,
            todo
        })
    } catch (error) {
        console.log(error);
        throw new customError("Wrong Route", 402)
    }
}


exports.searchInTodoAndTask = async (req, res) => {
    try {
        const { searchText } = req.body
        if(!searchText){
            throw new customError("Empty Search", 401)
        }
        const result = await Todo.find({
            $and:[
                {userId:req.user._id},
                {$or:[
                    {title:searchText},
                    {"tasks.taskName":`${searchText}`}
                ]}
            ]
        })
        res.status(200).json({
            success:true,
            result
        })
    } catch (error) {
        console.log(error);
        throw new customError("Empty Search", 401)
    }
}

exports.sortDateAndTime = async (req, res) =>{
    const uID = req.user._id;
    console.log(uID);
    const uniqueUser = await Todo.find({userId : uID});

    if (uniqueUser) {
    const sortedTodosAtCreation = await Todo.find({userId : uID}).sort({createdAt: -1});
    const sortedTodosAtUpdation = await Todo.find({userId : uID}).sort({updatedAt: -1});
        

    res.status(200).json({
        sortedTodosAtCreation,
        sortedTodosAtUpdation
    })}
}