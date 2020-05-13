const express = require('express');
const router = express.Router();
const {getItemsInList, addItemToList, getItemById} = require('../controllers/itemcontroller')

router.get("/", getItemsInList)
router.post("/", addItemToList)


router.param("itemId", getItemById)

module.exports = router;
