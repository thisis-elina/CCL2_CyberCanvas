//// Modules
const express = require('express');

//// Controllers
const userController = require("../controllers/userController");
const {updateJWT} = require("../services/authentication");

const userModel = require("../models/userModel");

//// Routes
const router = express.Router();


router.route('/')
    /**
     * Retrieves the user information.
     *
     * @name Get User Information
     * @route {GET} /api/user
     * @authentication This route requires user authentication.
     * @returns {Object} Returns the user information.
     * @throws {Error} If the user is not logged in or an error occurs.
     *
     * @description This route retrieves the user information for the authenticated user.
     *              It first checks if the user is authenticated by verifying the `req.user` property.
     *              If the user is authenticated, it calls the `getUser` function from the userModel module
     *              to retrieve the user information based on the user ID.
     *              The user information is then returned as a JSON response with a success status of 200.
     *              If the user is not logged in or an error occurs, an error message is returned.
     */
    .get((req, res, next) => {
        if (req.user) {
            userModel
                .getUser(req.user.id)
                .then((user) => {
                    let jsonReturnObject = {
                        success: true,
                        data: req.user,
                    };
                    res.status(200);
                    res.send(jsonReturnObject);
                })
                .catch((error) => {
                    console.log("error");
                    console.log(error);
                    let jsonReturnObject = {
                        success: false,
                        error: "user not logged in",
                    };
                    res.status(200);
                    res.send(jsonReturnObject);
                });
        } else {
            console.log("no req user");
            let jsonReturnObject = {
                success: false,
                error: "user not logged in",
            };
            res.status(200);
            res.send(jsonReturnObject);
        }
    })
    /**
     * Logs in a user.
     *
     * @name User Login
     * @route {POST} /api/user
     * @returns {Object} Returns the user information and a JWT token upon successful login.
     * @throws {Error} If the login fails or an error occurs.
     *
     * @description This route handles the user login functionality.
     *              It calls the `login` function from the userController module to authenticate the user.
     *              If the login is successful, it returns the user information and a JWT token in a JSON response.
     *              If the login fails or an error occurs, an error message is returned.
     */
    .post(userController.login);


//// Modules
module.exports = router;