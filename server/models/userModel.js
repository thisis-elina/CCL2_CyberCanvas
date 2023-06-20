//// Modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//// Services
const db = require("../services/database.js").config;

//// Functions
/**
 * This function access the DB and retrieves all the users
 * @returns A list of all Users within the DB
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
 * This function access the DB and retrieves all information form a specific user
 * @param id The ID of the User in question
 * @returns An object, which represents the user
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
        }
        resolve(user[0]);
      }
    });
  });

/**
 * This function add a new User to the DB
 * @param userData The Data, which the new user will have
 * @returns An object, which represents the newly created user
 */
let createUser = (userData) => new Promise (async (resolve, reject)=> {
    userData.password = userData.userPassword;
    userData.userPassword = await bcrypt.hash(userData.userPassword, 10);

    let sql = "INSERT INTO users (userName, userEmail, userPassword)" +
        " VALUES (" +  db.escape(userData.userName) +
        "," + db.escape(userData.userEmail) +
        "," + db.escape(userData.userPassword) +
        ")";

    db.query(sql, function (err, result, fields){
        if(err) {
            reject({
                status: 500,
                msg: err
            });
        }else{
            resolve(result.insertId)
        }
    })
})

//TODO fix order of the fields and field names to fit tables in Database
/**
 * This function updates a User in the DB
 * @param userData The Updated-Data of the User
 * @param userID The ID of the User in question
 * @returns The result of the db.query
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
      }
      console.log(result.affectedRows + " rows have been affected");
      resolve(result);
    });
  });

/**
 * This function deletes a User from the DB
 * @param userID The ID of the Use in question
 * @returns The ID of the user
 */
let deleteUser = (userID) =>
  new Promise((resolve, reject) => {
    let sql = "DELETE FROM users WHERE userID =" + parseInt(userID);

    db.query(sql, function (err, result, fields) {
      if (err) {
        const error = new Error("Internal Server Error");
        error.status = 500;
        reject(error);
      }
      console.log(result.affectedRows + " rows have been deleted");
      resolve(userID);
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
