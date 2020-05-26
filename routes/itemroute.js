const express = require('express');
const router = express.Router();
const {getItemsInList, addItemToList, getItemById,deleteItem,completeItem,undoCompleteItem, toggleCheck} = require('../controllers/itemcontroller')
const {itemCreationValidation,getItemCreationErrors} = require('../validation/itemvalidation')
const {needAuthentication,ensureCorrectUserPerformingAction} = require('../controllers/authcontroller')

router.get("/", getItemsInList)
router.get("/:itemId/toggle", toggleCheck)
router.get("/:itemId/check", completeItem)
router.get("/:itemId/uncheck", undoCompleteItem)
router.post("/",getItemCreationErrors, itemCreationValidation,addItemToList)
router.delete("/:itemId", deleteItem)

router.param("itemId", getItemById)

module.exports = router;
