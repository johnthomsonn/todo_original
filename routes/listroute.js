const express = require('express');
const router = express.Router();
const {getLists, createList, getListByListName,getList, deleteList} = require("../controllers/listcontroller");
const {getUserByUsernameParam} = require('../controllers/usercontroller')
const {listCreationValidation,getListCreationErrors} = require('../validation/listvalidation')
const {needAuthentication, ensureCorrectUserPerformingAction} = require('../controllers/authcontroller')

router.get("/", getLists);
router.post("/",getListCreationErrors, listCreationValidation,createList)
router.get("/:listName", getList)
router.delete("/:listName" , deleteList)

router.param("listName", getListByListName)

module.exports = router;
