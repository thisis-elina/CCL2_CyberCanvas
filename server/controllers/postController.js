const path = require("path");
const fs = require("fs");

//// Services
const authenticationService = require("../services/authentication");

//// Models
const {authenticateUser} = require("../services/authentication");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const db = require("express");
const bcrypt = require("bcrypt");

function getPost(req, res, next) {
    postModel
        .getPost(parseInt(req.params.postID))
        .then((post) => {
            let jsonReturnObject = {
                success: true,
                data: post,
            };
            res.status(200);
            res.send(jsonReturnObject);
            return jsonReturnObject;
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

function getPosts(req, res, next) {
    postModel
        .getPosts()
        .then((posts) => {
            let jsonReturnObject = {
                success: true,
                data: posts,
            };
            res.status(200);
            res.send(jsonReturnObject);
            return jsonReturnObject;
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

function createPost(req, res, next) {
    const userID = parseInt(req.user.id);
    postModel
        .createPost(req.body, userID)
        .then(r => {
        });
    console.log(req.body);
    res.send(JSON.stringify({success: 'Post gut'}));
}

function editPost(req, res, next) {
    postModel
        .editPost(req.body, req.params.postID)
        .then((post) => {
            res.send({success: "it worky"});
        })
        .catch((error) => res.sendStatus(500));
}

function deletePost(req, res, next) {
    postModel
        .deletePost(parseInt(req.params.postID))
        .then((data) => {
                    res.send({success: "it worky"});
            }
        )
        .catch((error) => {
            res.send({
                error: error,
                status: 500,
                success: false,
            });
        });
}

module.exports = {
    getPost,
    getPosts,
    createPost,
    editPost,
    deletePost
};
