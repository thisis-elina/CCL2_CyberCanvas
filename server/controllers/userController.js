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
                success: true,
                data: user
            }
            res.status(200);
            res.send(jsonReturnObject);

        })
        .catch(error => {
            let jsonReturnObject = {
                success: false,
                error: error.msg
            }
            res.status(500);
            res.send(jsonReturnObject);
        });
}

function editUser(req, res, next) {
    let hasAccess = authenticationService.checkAccess(
        req.user.role,
        parseInt(req.user.id),
        parseInt(req.params.userID)
    );

    if (hasAccess) {
        userModel
            .updateUser(req.body, req.params.userID)
            .then((user) => {
                let owns = authenticationService.ownership(
                    parseInt(req.user.id),
                    parseInt(req.params.userID)
                );
                if (owns) {
                    req.body.userRole = req.user.role
                    authenticationService.updateJWT(res, req.body);
                }
                res.send({success: "it worky"});
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
        .then((userID) => {
            userModel.getUsers()
                .then(async users => {
                    console.log(req.body);
                    await authenticateUser({userName: req.body.userName, userPassword: req.body.password}, users, res)
                })
                .catch(error => {
                    let jsonReturnObject = {
                        success: false,
                        error: error.msg
                    }
                    res.status(error.status);
                    res.send(jsonReturnObject);
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
        .deleteUser(parseInt(req.params.userID))
        .then((data) => {
            let owns = authenticationService.ownership(
                parseInt(req.user.id),
                parseInt(req.params.userID)
            );
            if (owns) {
                res.cookie('accessToken', '', {
                    maxAge: 0,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                });
            }
            res.send({
                error: "",
                status: 200,
                success: true,
            });
        })
        .catch((error) => {
            res.send({
                error: error,
                status: 500,
                success: false,
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
            authenticationService.authenticateUser(req.body, users, res).then(r => {
            });
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
        success: "user logged out"

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
