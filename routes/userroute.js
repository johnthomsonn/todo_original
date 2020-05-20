const express = require('express');
const router = express.Router();
const {getUserByUsernameParam,getAllUsers,getUserProfile} = require('../controllers/usercontroller')
const {deleteUser} = require('../controllers/usercontroller')
const {needAuthentication,ensureCorrectUserPerformingAction} = require('../controllers/authcontroller')

router.get("/", getAllUsers);
router.delete("/:username", ensureCorrectUserPerformingAction, deleteUser) //require sign in
router.get("/:username", ensureCorrectUserPerformingAction, getUserProfile)

router.param("username", getUserByUsernameParam);


module.exports = router;
