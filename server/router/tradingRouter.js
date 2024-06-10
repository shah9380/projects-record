const express = require("express");
const { getTradingData, TradingDataInsertion, deleteAllRecords, insertMultipleRecords } = require("../cotroller/tradingController");

var router = express.Router();

router.get('/info',getTradingData)
router.post('/createinfo',TradingDataInsertion)
router.post('/insertMultiple', insertMultipleRecords)
router.delete('/deleteAll', deleteAllRecords);

module.exports = router