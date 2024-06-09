const User = require("../models/userSchema.js");
const expressAsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()

const authMiddleWare = expressAsyncHandler(
    async (req, res, next)=>{
        let token;
        if(req?.headers?.authorization?.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1]
            try {
                if(token){
                    const decoded = jwt.verify(token,"mysecretismine")
                    const user = await User.findById(decoded?.id)
                    req.user = user;
                    next()
                }
            } catch (error) {
                throw new Error('No authorized token expired, please login again')
            }
        }else{
            throw new Error('There is no token attached to header');
        }
    }
)

const isAdmin = expressAsyncHandler(
    async (req, res, next)=>{
        const {email} = req.user;
        const user = await User.findOne({email})
    
        if(!user){
            throw new Error("User Not Found");
        }
        if(user.role !== 'admin'){
            throw new Error("you're not authorized to perform this action")
        }
        next()
    }
)

module.exports = {isAdmin, authMiddleWare}