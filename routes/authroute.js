const express = require('express');
const router = express.Router();
const {signup, signin} = require('../controllers/authcontroller')
const {signupValidation, signinValidation} = require('../validation/authvalidation')

router.post("/signup", signupValidation ,signup);
router.post("/signin", signinValidation, signin);

module.exports = router;
