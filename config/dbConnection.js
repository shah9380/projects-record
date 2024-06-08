const mongoose = require("mongoose")


const connectDB = async ()=>{
    try {
       await mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.vqjydny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
            console.log("data base connected")
       })
    } catch (error) {
        console.log("unable to connect to DataBase")
    }
}

module.exports = {connectDB}