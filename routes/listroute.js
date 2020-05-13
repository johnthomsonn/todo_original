const express = require('express');
const router = express.Router();
const {getLists, createList, getListByListName,getList} = require("../controllers/listcontroller");
const {getUserByUsernameParam} = require('../controllers/usercontroller')
const {listCreationValidation} = require('../validation/listvalidation')

router.get("/", getLists);
router.post("/", listCreationValidation,createList)
router.get("/:listName", getList)

router.param("listName", getListByListName)

module.exports = router;
