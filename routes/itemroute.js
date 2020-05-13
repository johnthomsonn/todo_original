const express = require('express');
const router = express.Router();
const {getItemsInList, addItemToList, getItemById,deleteItem,completeItem,undoCompleteItem} = require('../controllers/itemcontroller')

router.get("/", getItemsInList)
router.get("/:itemId/check", completeItem)
router.get("/:itemId/uncheck", undoCompleteItem)
router.post("/", addItemToList)
router.delete("/:itemId", deleteItem)

router.param("itemId", getItemById)

module.exports = router;
