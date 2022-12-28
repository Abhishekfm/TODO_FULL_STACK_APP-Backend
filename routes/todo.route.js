const { createTodo, getTodo, editTodo, deleteTodo, searchInTodoAndTask, sortDateAndTime } = require("../controllers/todo.controller")
const { isLoggedIn } = require("../middleware/user.auth")
const express = require("express");

const router = express.Router();


router.post("/todo", isLoggedIn, createTodo)
router.get("/todo", isLoggedIn, getTodo)
router.post("/todo/edit/:id", isLoggedIn, editTodo)
router.delete("/todo/delete/:id", isLoggedIn, deleteTodo)
console.log("ssjakjkak");
router.post("/todo/search", isLoggedIn, searchInTodoAndTask)
router.get("/todo/sort", isLoggedIn, sortDateAndTime)

module.exports = router;