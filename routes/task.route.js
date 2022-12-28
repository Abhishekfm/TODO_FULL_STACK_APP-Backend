const express = require("express")
const { createTask, getTasks, editTask, deleteTask, doneTask, searchInTask } = require("../controllers/task.controller")
const { isLoggedIn } = require("../middleware/user.auth")

const router = express.Router();

router.post("/todo/task/:id", isLoggedIn, createTask)
router.get("/todo/task/:id", isLoggedIn, getTasks)
router.post("/todo/task/:todoId/:taskId", isLoggedIn, editTask)
router.delete("/todo/task/:todoId/:taskId", isLoggedIn, deleteTask)
router.post("/todo/task/done/:todoId/:taskId", isLoggedIn, doneTask)
router.get("/search/todo/task", isLoggedIn, searchInTask)

module.exports = router