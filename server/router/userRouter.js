const express = require("express")
const { serverCheck } = require("../cotroller/serverCheckCtrl")
const { userRegister, deleteUser, getAllUsers, login, logOut } = require("../cotroller/userCtrl")
const { isAdmin, authMiddleWare } = require("../middlewares/authMiddleWare")

var router = express.Router()

router.get("/", serverCheck)
router.get("/logout",authMiddleWare,logOut)
router.post("/users",authMiddleWare,isAdmin, getAllUsers)
router.post("/register",userRegister)
router.post("/login", login)
router.delete("/delete",authMiddleWare,deleteUser)

module.exports = router