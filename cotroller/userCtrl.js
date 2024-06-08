const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()


const User = require("../models/userSchema.js");
const { genrateToken } = require("../config/jwtToken.js");
const { use$geoWithin } = require("mongoose/lib/query.js");

const userRegister = expressAsyncHandler(
    async (req, res, next)=>{
        try {
            const {email, mobile} = req.body;
            const userFound = await User.findOne({email});
            const userFoundWithSameMobile = await User.findOne({mobile});
            if(userFound || userFoundWithSameMobile){
                throw new Error("User already exists with same mobile number or email")
            }
            const newUser = await User.create(req.body);
            
            res.status(200).json({
                success: true,
                newUser
            })
        } catch (error) {
            throw new Error(error)
        }
    }
)

const login = expressAsyncHandler(
    async (req, res)=>{
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email})
            if(user && await user.isPasswordMatched(password)){
                const refreshToken = await genrateToken(user?._id);
                const updatedUser = await User.findOneAndUpdate(user?._id, {
                    refreshToken: refreshToken
                },{
                    new: true
                })
                res.cookie('refreshToken', refreshToken,{
                    httpOnly: true,
                    maxAge: 3* 24 * 60 * 60 * 1000  //for 3 days
                })
                res.status(200).json({
                    status: true,
                    message: "login successfull",
                    updatedUser
                })
            }else{
                throw new Error("Invalid Credentials")
            }
        } catch (error) {
            throw new Error(error)
        }
    }
)

const logOut = expressAsyncHandler(
    async (req, res)=>{
        const {email} = req.user;
        res.clearCookie("refreshToken")
      const user = await User.findOneAndUpdate({email},{
        refreshToken: ""
      },{
        new: true
      })
      if(user){
        res.status(200).json({
            status: true,
            user,
            message: "logged out"
        })
      }
    }
)

const getAllUsers = expressAsyncHandler(
    async (req, res)=>{
        try {
            const users = await User.find()
            res.status(200).json({
                users
            })
        } catch (error) {
            throw new Error(error)
        }
    }
)


const deleteUser = expressAsyncHandler(
    async (req, res)=>{
        try {
            const {email} = req.user
            const userFound = await User.findOne({email});
            if(!userFound){
                throw new Error("User doesn't exists")
            }
           const deletedUser =  await User.deleteOne({email});
    
           res.status(200).json({
                status: true,
                message: "user deleted",
                deletedUser
           })
    
        } catch (error) {
            throw new Error(error)
        }
    }
)

module.exports = {userRegister, deleteUser, getAllUsers, login, logOut}