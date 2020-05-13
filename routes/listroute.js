const express = require('express');
const router = express.Router();
const {test} = require("../controllers/listcontroller");
const {getUserByUsernameParam} = require('../controllers/usercontroller')
router.get("/", test);




module.exports = router;
