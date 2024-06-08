const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()

const genrateToken = async (id)=>{
    return jwt.sign({id}, "mysecretismine" ,{expiresIn: "10h"})
}

module.exports = {genrateToken}