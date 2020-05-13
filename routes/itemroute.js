const express = require('express');
const router = express.Router();
const {getItemsInList} = require('../controllers/itemcontroller')

router.get("/", getItemsInList)

module.exports = router;
