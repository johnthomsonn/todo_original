const express = require('express');
const router = express.Router();
const {signup, signin} = require('../controllers/authcontroller')
const {signupValidation} = require('../validation/authvalidation')

router.post("/signup", signupValidation ,signup);
router.post("/signin", signin);

module.exports = router;
