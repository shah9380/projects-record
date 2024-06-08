const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config()
const cookieParser =  require("cookie-parser")

const {connectDB} = require("./config/dbConnection.js")
const userRouter = require("./router/userRouter.js")
const { notFound, errorhandler } = require("./middlewares/errorHandling.js")

const app = express();
app.use(cookieParser())

const PORT = process.env.PORT || 7200;

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

connectDB()

app.use("/",userRouter)

app.use(notFound,errorhandler);

app.listen(PORT, (req, res)=>{
    console.log(`server is working fine at http://localhost:${PORT}`)
})