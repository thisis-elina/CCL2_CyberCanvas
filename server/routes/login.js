//// Modules
const express = require('express');

//// Controllers
const userController = require("../controllers/userController");
const {updateJWT} = require("../services/authentication");

const userModel = require("../models/userModel");

//// Routes
const router = express.Router();


router.route('/')
    .get((req, res, next) => {
        console.log("login is called")
        console.table(req.cookies);
        console.log("created cookie")
        if (req.user) {
            userModel
                .getUser(req.user.id)
                .then((user) => {
                    // updateJWT(res, user, req);
                    let jsonReturnObject = {
                        success: true,
                        data: req.user,
                    };
                    res.status(200);
                    res.send(jsonReturnObject);
                })
                .catch((error) => {
                    console.log("error");
                    console.log(error)
                    let jsonReturnObject = {
                        success: false,
                        error: "user not logged in",
                    };
                    res.status(200);
                    res.send(jsonReturnObject);
                });
        } else {
            console.log("no req user")
            let jsonReturnObject = {
                success: false,
                error: "user not logged in",
            };
            res.status(200);
            res.send(jsonReturnObject);
        }
    })
    .post(userController.login);

//// Modules
module.exports = router;