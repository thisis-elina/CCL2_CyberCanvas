//// Modules
const express = require('express');

//// Controllers
const userController = require("../controllers/userController");

//// Routes
const router = express.Router();

//// Services
const authenticationService = require("../services/authentication");

//// Models
const userModel = require("../models/userModel");
const {authenticateUser} = require("../services/authentication");

router.route('/')
    .get(userController.logout)

//// Modules
module.exports = router;