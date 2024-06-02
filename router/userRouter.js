const express = require("express")
const { serverCheck } = require("../cotroller/serverCheckCtrl")

var router = express.Router()

router.get("/", serverCheck)

module.exports = router