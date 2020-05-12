const express = require('express');
const router = express.Router();
const {signup, signin,signout} = require('../controllers/authcontroller')
const {signupValidation, signinValidation} = require('../validation/authvalidation')

router.post("/signup", signupValidation ,signup);
router.post("/signin", signinValidation, signin);
router.get("/signout", signout)

module.exports = router;
