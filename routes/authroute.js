const express = require('express');
const router = express.Router();
const {signup} = require('../controllers/authcontroller')
const {signupValidation} = require('../validation/authvalidation')

router.post("/", signupValidation ,signup);


module.exports = router;
