const express = require('express');
const router = express.Router();
const {getLists, createList} = require("../controllers/listcontroller");
const {getUserByUsernameParam} = require('../controllers/usercontroller')
const {listCreationValidation} = require('../validation/listvalidation')

router.get("/", getLists);
router.post("/", listCreationValidation,createList)



module.exports = router;
