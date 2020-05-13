const express = require('express');
const router = express.Router();
const {getItemsInList, addItemToList, getItemById,deleteItem} = require('../controllers/itemcontroller')

router.get("/", getItemsInList)
router.post("/", addItemToList)
router.delete("/:itemId", deleteItem)

router.param("itemId", getItemById)

module.exports = router;
