const expressAsyncHandler = require("express-async-handler")
const TradingModel = require("../models/tradingSchema.js")

const getTradingData = expressAsyncHandler(
    async (req, res)=>{
       const foundData = await TradingModel.find();
       if(!foundData){
            throw new Error("unable to find the data")
       }
       res.status(200).json(foundData)
    }
)

const TradingDataInsertion = expressAsyncHandler(
    async (req, res)=>{
        const {time, pairName} = req?.body;
        if(time){
            const prevData = await TradingModel.findOne({time, pairName})
            if(!prevData){
                const newData = await TradingModel.create(req?.body);
                res.status(200).json({
                    status: true,
                    data: newData
                })
            }
            throw new Error("data with same pair and time stamp already present")
        }else{
            throw new Error("please provide valid data")
        }
    }
)

const insertMultipleRecords = expressAsyncHandler(
    async (req, res)=>{
        // const {time, pairName} = req?.body;
        const records = req?.body;
        if(records.length > 0){
                    // Aggregate to find duplicates based on time and pairName
            const uniqueCombinations = new Set();
            const dataBaseCombinations = new Set();

            const duplicatesPayLoad = [];
            const duplicates = [];

            const foundData = await TradingModel.find();
            foundData.forEach(item => {
                    const combination = item.time + item.pairName;
                    dataBaseCombinations.add(combination);
            })
            console.log(dataBaseCombinations)
            // Filter out duplicates based on the combination of time and pairName
            const uniqueData = records.filter(item => {
                const combination = new Date(item.time) + item.pairName;
                if(uniqueCombinations.has(combination)){
                    duplicatesPayLoad.push(item);
                    return false;
                }else if(dataBaseCombinations.has(combination)){
                    uniqueCombinations.add(combination);
                    duplicates.push(item)
                    return false;
                }
                return true;
            })
            // const prevData = await TradingModel.findOne({time, pairName})
            if(records){
                const newData = await TradingModel.insertMany(uniqueData);
                let message = `${newData.length} records added`
                let duplicateRecordsMsg = ""
                if(duplicates.length > 0){
                    duplicateRecordsMsg = `${duplicates.length} of ${records.length} records are already present in DataBase`
                }
                if(duplicatesPayLoad.length > 0){
                    console.log(duplicatesPayLoad.length, "ksdj")
                    let msg = `${duplicatesPayLoad.length} duplicates found in the payload`;
                    console.log()
                    duplicates.length > 0 ? duplicateRecordsMsg = `${duplicateRecordsMsg} and ${msg}` : duplicateRecordsMsg = msg;
                }
                res.status(200).json({
                    status: true,
                    data: newData,
                    message,
                    duplicateRecordsMsg
                })
            }else{
                throw new Error("data with same pair and time stamp already present")
            }
        }else{
            throw new Error("please provide valid data")
        }
    }
)

const deleteAllRecords = expressAsyncHandler(async (req, res) => {
    // Delete all records using Mongoose's deleteMany method
    await TradingModel.deleteMany({});
    
    // Return a success response
    return res.status(200).json({ message: "All records deleted successfully." });
});

module.exports = {getTradingData, TradingDataInsertion, deleteAllRecords, insertMultipleRecords}