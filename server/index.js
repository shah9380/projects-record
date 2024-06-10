const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config()
const cookieParser =  require("cookie-parser")
const path = require("path");
const multer = require('multer');


const {connectDB} = require("./config/dbConnection.js")
const userRouter = require("./router/userRouter.js")
const tradingRouter = require("./router/tradingRouter.js")
const { notFound, errorhandler } = require("./middlewares/errorHandling.js")



const app = express();

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

app.use(cookieParser())

const PORT = process.env.PORT || 7200;

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

connectDB()

// API endpoint for uploading Excel file
app.post('/api/uploadExcel/tradingData', upload.single('excelFile'), async (req, res) => {
    try {
        // Read the uploaded file using ExcelJS
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.readFile(req.file.path);
        const worksheet = workbook.getWorksheet(1);

        // Extract data from the Excel worksheet
        const data = [];
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            if (rowNumber !== 1) { // Skip header row
                const rowData = {
                    pairName: row.getCell(1).value,
                    news: row.getCell(2).value,
                    impact: row.getCell(3).value,
                    marketDirection: row.getCell(4).value,
                    time: row.getCell(5).value,
                    prevClose: row.getCell(6).value,
                    open: row.getCell(7).value,
                    close: row.getCell(8).value,
                    low: row.getCell(9).value,
                    high: row.getCell(10).value,
                    reversal: row.getCell(11).value
                };
                data.push(rowData);
            }
        });

        // Insert data into the database
        await TradingModel.insertMany(data);

        res.status(200).send('Data inserted successfully');
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Internal Server Error');
    }
});
/* app.get("/",(req, res)=>{
    res.json("Hello")
}) **/

app.use("/api",userRouter)
app.use("/api/trading",tradingRouter)

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
