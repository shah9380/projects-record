const mongoose = require("mongoose")

const tradingSchema = mongoose.Schema({
    pairName:{
        type: String,
        required: true,
    },
    news:{
        type: String,
        required: true
    },
    impact:{
        type: String,
        enum:['UP', 'DOWN'],
        required: true
    },
    marketDirection:{
        type: String,
        enum:['UP','DOWN'],
        required: true
    },
    time:{
        type: Date,
        required: true
    },
    prevClose:{
        type: Number,
        required: true
    },
    open:{
        type: Number,
        required: true
    },
    close:{
        type: Number,
        required: true
    },
    low:{
        type: Number,
        required: true
    },
    high:{
        type: Number,
        required: true
    },
    reversel:{
        type: String,
        enum:['Worked','Not Worked'],
    }

},{
    timestamps: true
})

module.exports = mongoose.model("TradingRecord", tradingSchema)