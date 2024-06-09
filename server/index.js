const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config()
const cookieParser =  require("cookie-parser")
const path = require("path");


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

app.get("/",(req, res)=>{
    res.json("Hello")
})

app.use("/api",userRouter)

// Static files from React
app.use(express.static(path.join(__dirname, "../client/build")));

// Custom serverCheck route
const serverCheck = (req, res) => {
    try {
        // res.sendFile(path.join(__dirname, "../client/build", "index.html"));
        // console.log(path.join(__dirname, "../client/build", "index.html"));
        res.status(200).send({
            message: "Awesome! Server is Cool",
            status: true,
        });
    } catch (error) {
        res.status(502).send({
            message: "Unable to connect server at the moment",
            status: false,
        });
    }
};

app.get("/server-check", serverCheck);

// Serve React app for all other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.use(notFound,errorhandler);

app.listen(PORT, (req, res)=>{
    console.log(`server is working fine at http://localhost:${PORT}`)
})