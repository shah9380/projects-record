const express = require("express")
// const { serverCheck } = require("../cotroller/serverCheckCtrl")
const { userRegister, deleteUser, getAllUsers, login, logOut, checkCookies } = require("../cotroller/userCtrl")
const { isAdmin, authMiddleWare, checkLoggedIn } = require("../middlewares/authMiddleWare")

var router = express.Router()

// router.get("/", serverCheck)
router.get("/logout",logOut)
router.get("/check-cookie",checkCookies)
router.get("/users",checkLoggedIn,isAdmin, getAllUsers)
router.post("/register",userRegister)
router.post("/login", login)
router.delete("/delete",authMiddleWare,deleteUser)

module.exports = router