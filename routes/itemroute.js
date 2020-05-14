const express = require('express');
const router = express.Router();
const {getItemsInList, addItemToList, getItemById,deleteItem,completeItem,undoCompleteItem} = require('../controllers/itemcontroller')
const {itemCreationValidation} = require('../validation/itemvalidation')
const {needAuthentication} = require('../controllers/authcontroller')

router.get("/", needAuthentication,getItemsInList)
router.get("/:itemId/check",needAuthentication, completeItem)
router.get("/:itemId/uncheck",needAuthentication, undoCompleteItem)
router.post("/",needAuthentication, itemCreationValidation,addItemToList)
router.delete("/:itemId",needAuthentication, deleteItem)

router.param("itemId", getItemById)

module.exports = router;
