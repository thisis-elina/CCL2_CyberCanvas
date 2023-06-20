//// Modules

//// Services
const {authenticateUser, updateJWT} = require("../services/authentication");

//// Models
const userModel = require("../models/userModel");
const authenticationService = require("../services/authentication");

//// Functions

/**
 * Retrieves a list of users.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {Promise} - A promise that resolves with the retrieved users or an error object.
 */
function getUsers(req, res, next) {
    userModel
        .getUsers()
        .then((users) => {
            let jsonReturnObject = {
                success: true,
                data: users,
            };
            res.status(200);
            res.send(jsonReturnObject);
        })
        .catch((error) => {
            let jsonReturnObject = {
                success: false,
                error: error,
            };
            res.status(500);
            res.send(jsonReturnObject);
        });
}

function getUser(req, res, next) {
    let userID = parseInt(req.params.userID);
    userModel.getUser(userID)
        .then(user => {
            let jsonReturnObject = {
                success : true,
                data: user
            }
            res.status(200);
            res.send(jsonReturnObject);

        })
        .catch(error => {
            let jsonReturnObject = {
                success : false,
                error: error.msg
            }
            res.status(error.status);
            res.send(jsonReturnObject);
        });
}

function editUser(req, res, next) {
    console.log("editUser");
    let hasAccess = authenticationService.checkAccess(
        req.user.role,
        parseInt(req.user.id),
        parseInt(req.params.id)
    );

    if (hasAccess) {
        userModel
            .updateUser(req.body, req.params.id)
            .then((user) => {
                let owns = authenticationService.ownership(
                    parseInt(req.user.id),
                    parseInt(req.params.id)
                );
                if (owns) {
                    authenticationService.updateJWT(res, req.body);
                }
                res.redirect("../../users/" + req.params.id);
            })
            .catch((error) => res.sendStatus(500));
    } else {
        console.log("no rights");
        res.status(403);
        next("No rights");
    }
}

/**
 * This function creates a new user
 * data inside req.body
 * Preferred-Methode: POST
 *
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function createUser(req, res, next) {
    userModel
        .createUser(req.body)
        .then((user) => {
            console.log(req.body)
            authenticateUser(
                {userName: req.body.userName, userPassword: req.body.originalPassword},
                [user],
                res
            ).then((r) => {
            });
        })
        .catch((error) => res.sendStatus(500));
}

/**
 * This function deletes a user
 * data inside req.body
 * Preferred-Methode: DELETE
 *
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function deleteUser(req, res, next) {
    userModel
        .deleteUser(parseInt(req.params.id))
        .then((data) => {
            res.send({
                error: "",
                status: 200,
                redirect: "/users/",
            });
        })
        .catch((error) => {
            res.send({
                error: error,
                status: 500,
                redirect: "/",
            });
        });
}

/**
 * This function creates tries to log in a user
 * data inside req.body
 * Preferred-Methode: POST
 *
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function login(req, res, next) {
    console.log(req.body);
    userModel.getUsers()
        .then((users) => {
            authenticationService.authenticateUser(req.body, users, res).then(r => {} );
        })
        .catch((err) => {
            res.sendStatus(500);
        });
}
    /**
     * This function logs out the User and redirects him to the index-page
     * Preferred-Methode: GET
     *
     * @param req HTTP-Request
     * @param res HTTP-Response
     * @param next Possible-Middleware
     */
    function logout(req, res, next) {
        res.cookie('accessToken', '', {
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        let jsonReturnObject = {
            success : "user logged out"

        }
        res.status(200);
        res.send(jsonReturnObject);
    }

//// Exports
    module.exports = {
        getUsers,
        getUser,
        createUser,
        editUser,
        deleteUser,
        login,
        logout,
    };
