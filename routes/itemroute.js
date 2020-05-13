const express = require('express');
const router = express.Router();
const {getItemsInList, addItemToList} = require('../controllers/itemcontroller')

router.get("/", getItemsInList)
router.post("/", addItemToList)

module.exports = router;
