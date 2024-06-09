const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    refreshToken: String
},{
    timestamps: true,
});

userSchema.pre('save',async function(){
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);    
})

userSchema.methods.isPasswordMatched = async function(password){
       return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("UserProfilesPojo", userSchema)