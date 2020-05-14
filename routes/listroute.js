const express = require('express');
const router = express.Router();
const {getLists, createList, getListByListName,getList, deleteList} = require("../controllers/listcontroller");
const {getUserByUsernameParam} = require('../controllers/usercontroller')
const {listCreationValidation} = require('../validation/listvalidation')
const {needAuthentication} = require('../controllers/authcontroller')

router.get("/",needAuthentication, getLists);
router.post("/",needAuthentication, listCreationValidation,createList)
router.get("/:listName",needAuthentication, getList)
router.delete("/:listName" ,needAuthentication, deleteList)

router.param("listName", getListByListName)

module.exports = router;
