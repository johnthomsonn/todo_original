const express = require('express');
const router = express.Router();
const {signup, signin,signout, deleteUser,needAuthentication, isLoggedIn} = require('../controllers/authcontroller')
const {signupValidation, signinValidation,getSignupErrors,getSignInErrors} = require('../validation/authvalidation')


router.post("/signup", getSignupErrors, signupValidation ,signup);
router.post("/signin", getSignInErrors,signinValidation, signin);
router.get("/signout", signout);
router.get("/islogged",isLoggedIn); 


module.exports = router;
