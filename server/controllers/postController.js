const path = require("path");
const fs = require("fs");

//// Services
const authenticationService = require("../services/authentication");

//// Models
const {authenticateUser} = require("../services/authentication");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const db = require("express");

function getPosts(req, res, next) {
    return postModel
        .getPosts()
        .then((posts) => {
            let jsonReturnObject = {
                success: true,
                data: posts,
            };
            res.status(200);
            res.send(jsonReturnObject);
            return jsonReturnObject; // Return the response object if needed
        })
        .catch((error) => {
            let jsonReturnObject = {
                success: false,
                error: error,
            };
            res.status(500);
            res.send(jsonReturnObject);
            throw error; // Throw the error to propagate it if needed
        });
}

class Post {
    constructor(title, tags, description, userID, views) {
        this.title = title;
        this.tags = tags;
        this.description = description;
        this.userID = userID;
        this.views = views;
    }
}

function createPost(req, res, next) {
    const userID = parseInt(req.user.id);
    postModel
        .createPost(req.body, userID)
        .then(r => {
    });
    console.log(req.body);
    res.send(JSON.stringify({success: 'Post gut'}));
}


module.exports = {
    getPosts,
    createPost,
};
