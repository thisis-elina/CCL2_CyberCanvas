//// Modules
const bcrypt = require("bcrypt");

//// Services
const db = require("../services/database.js").config;

//// Functions

/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 * @throws {Error} If an error occurs while retrieving the users.
 *
 * @description This function accesses the database and retrieves all users.
 *              It performs a SQL query to fetch all users from the `users` table.
 *              The array of user objects is resolved if retrieval is successful.
 */
let getUsers = () =>
    new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users";
        db.query(sql, function (err, users, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(users);
            }
        });
    });

/**
 * Retrieves information for a specific user from the database.
 *
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the retrieved user object.
 * @throws {Error} If the user is not found or an error occurs while retrieving the user.
 *
 * @description This function accesses the database and retrieves information for a specific user.
 *              It performs a SQL query to fetch the user with the provided ID from the `users` table.
 *              The user object is resolved if retrieval is successful.
 */
let getUser = (id) =>
    new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users WHERE userID =" + parseInt(id);
        db.query(sql, function (err, user, fields) {
            if (err) {
                reject(err);
            } else {
                if (!user[0]) {
                    console.log("User not found");
                    reject("User not found");
                } else {
                    resolve(user[0]);
                }
            }
        });
    });

/**
 * Creates a new user in the database.
 *
 * @param {Object} userData - The data for the new user.
 * @returns {Promise<number>} A promise that resolves to the ID of the newly created user.
 * @throws {Error} If an error occurs while creating the user.
 *
 * @description This function adds a new user to the database.
 *              It performs a SQL query to insert the user data into the `users` table.
 *              The ID of the newly created user is resolved if creation is successful.
 */
let createUser = (userData) =>
    new Promise(async (resolve, reject) => {
        userData.password = userData.userPassword;
        userData.userPassword = await bcrypt.hash(userData.userPassword, 10);

        let sql =
            "INSERT INTO users (userName, userEmail, userPassword)" +
            " VALUES (" +
            db.escape(userData.userName) +
            "," +
            db.escape(userData.userEmail) +
            "," +
            db.escape(userData.userPassword) +
            ")";
        console.log("We are in create");
        db.query(sql, function (err, result, fields) {
            if (err) {
                reject({
                    status: 500,
                    msg: err,
                });
            } else {
                console.log(result.insertId);
                resolve(result.insertId);
            }
        });
    });

/**
 * Updates a user in the database.
 *
 * @param {Object} userData - The updated data of the user.
 * @param {number} userID - The ID of the user to update.
 * @returns {Promise<Object>} A promise that resolves to the result of the database query.
 * @throws {Error} If an error occurs while updating the user.
 *
 * @description This function updates an existing user in the database.
 *              It performs a SQL query to update the user with the provided data.
 *              The result of the database query is resolved if the update is successful.
 */
let updateUser = (userData, userID) =>
    new Promise(async (resolve, reject) => {
        console.log("Updating User");

        if (userData.userPassword) {
            userData.userPassword = await bcrypt.hash(userData.userPassword, 10);
        }

        let updates = [];

        if (userData.userName) {
            updates.push("userName = " + db.escape(userData.userName));
        }

        if (userData.userPassword) {
            updates.push("userPassword = " + db.escape(userData.userPassword));
        }

        if (userData.userEmail) {
            updates.push("userEmail = " + db.escape(userData.userEmail));
        }

        if (userData.userBio) {
            updates.push("userBio = " + db.escape(userData.userBio));
        }

        let sql =
            "UPDATE users SET " +
            updates.join(", ") +
            " WHERE userID = " +
            parseInt(userID);
        userData.userID = parseInt(userID);
        console.log(sql);

        db.query(sql, function (err, result, fields) {
            if (err) {
                const error = new Error("Bad Request");
                error.status = 400;
                reject(error);
            } else {
                console.log(result.affectedRows + " rows have been affected");
                resolve(result);
            }
        });
    });

/**
 * Deletes a user from the database.
 *
 * @param {number} userID - The ID of the user to delete.
 * @returns {Promise<number>} A promise that resolves to the ID of the deleted user.
 * @throws {Error} If an error occurs while deleting the user.
 *
 * @description This function deletes an existing user from the database.
 *              It performs a SQL query to delete the user.
 *              The ID of the deleted user is resolved if deletion is successful.
 */
let deleteUser = (userID) =>
    new Promise((resolve, reject) => {
        let sql = "DELETE FROM users WHERE userID =" + parseInt(userID);

        db.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
                const error = new Error("Internal Server Error");
                error.status = 500;
                reject(error);
            } else {
                console.log(result.affectedRows + " rows have been deleted");
                resolve(userID);
            }
        });
    });

//// Exports
module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
