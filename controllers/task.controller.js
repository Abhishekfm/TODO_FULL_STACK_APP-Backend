const Todo = require("../models/user.todo")
const customError = require("../utils/custom.error")

exports.createTask = async (req, res) => {
    try {
        const _id = req.params.id
        const { taskName } = req.body
        
        if(!_id || !taskName){
            throw new customError("Provide All details", 401)
        }
        const existTodo = await Todo.findOne({_id})

        if(!existTodo){
            throw new customError("Todo Not Exist", 401)
        }
        const taskCreate = {
            taskName:taskName,
            done:false
        }
        existTodo.tasks.push(taskCreate)
        await existTodo.save();
        res.status(200).json({
            success: true,
            taskCreate,
            allTask: existTodo.tasks
        })
    } catch (error) {
        console.log(error);
        throw new customError("ERROR OUT", 401)
    }

}

exports.getTasks = async (req, res) => {
    try {
        const _id = req.params.id
        
        if(!_id){
            throw new customError("Provide details", 401)
        }
        const taskTodo = await Todo.findOne({_id})
        if(!taskTodo){
            throw new customError("NO Todo", 401)
        }
        res.status(201).json({
            success: true,
            allTask: taskTodo.tasks
        })
    } catch (error) {
        console.log(error);
        throw new customError("Todo not exist", 401)
    }
}

exports.editTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const todoId = req.params.todoId
        const { taskName, done } = req.body

        if(!taskId || !taskName || !todoId){
            throw new customError("Provide All Details", 401)
        }
        const todo = await Todo.findOne({_id:todoId})
        if(!todo){
            throw new customError("Wrong Details", 401)
        }
        const tasks = todo.tasks
        const taskNeedToEdit = tasks.find(ele => ele._id.equals(taskId))
        taskNeedToEdit.taskName = taskName
        taskNeedToEdit.done = done
        await todo.save()
        res.status(200).json({
            success:true,
            tasks,
            taskNeedToEdit
        })

    } catch (err) {
        console.log(err);
        throw new customError("Wrong Details", 401)
    }
}


exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const todoId = req.params.todoId

        if(!taskId || !todoId){
            throw new customError("Provide All Details", 401)
        }
        const todo = await Todo.findOne({_id:todoId})
        if(!todo){
            throw new customError("Wrong Details", 401)
        }
        let tasks = todo.tasks
        const newTask = tasks.filter((ele)=>{
            return !ele._id.equals(taskId)
        })
        tasks = newTask
        todo.tasks = tasks
        await todo.save()
        res.status(200).json({
            success:true,
            tasks
        })

    } catch (err) {
        console.log(err);
        throw new customError("Wrong Details", 401)
    }
}


exports.doneTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const todoId = req.params.todoId
        const { done } = req.body

        if(!taskId || !todoId){
            throw new customError("Provide All Details", 401)
        }
        const todo = await Todo.findOne({_id:todoId})
        if(!todo){
            throw new customError("Wrong Details", 401)
        }
        const tasks = todo.tasks
        const taskNeedToEdit = tasks.find(ele => ele._id.equals(taskId))
        taskNeedToEdit.done = done
        await todo.save()
        res.status(200).json({
            success:true,
            tasks,
            taskNeedToEdit
        })

    } catch (err) {
        console.log(err);
        throw new customError("Wrong Details", 401)
    }
}

exports.searchInTask = async (req, res) => {
    try {
        const { searchText } = req.body
        console.log(searchText);
        if(!searchText){
            throw new customError("Empty Search", 401)
        }
        console.log("okkokok");
        const result = await Todo.find({
            $and:[
                {userId:req.user._id},
                {tasks:{$elemMatch:{taskName:searchText}}}
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