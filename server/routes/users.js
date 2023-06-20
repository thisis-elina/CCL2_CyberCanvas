//// Modules
const express = require("express");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

//// Models
const userModel = require("../models/userModel");

//// Routes
const router = express.Router();

//// Controllers
const userController = require("../controllers/userController");
const { updateJWT } = require("../services/authentication");

router.route("/").
get(userController.getUsers).
post(userController.createUser);


router.route("/:userID");
//    .get(userController.getUser)
//    .put(userController.updateUser)
//    .delete(userController.deleteUser);

//// Modules
module.exports = router;
