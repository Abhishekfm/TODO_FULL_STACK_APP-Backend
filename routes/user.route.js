const { createUser, login, getDashboard, logout } = require("../controllers/user.controller");
const express = require("express")
const { isLoggedIn } = require("../middleware/user.auth")

const router  = express.Router();



router.post("/createUser",createUser);
router.post("/login",login);
router.get("/dashboard", isLoggedIn, getDashboard);
router.get("/logout",logout);


module.exports = router
