const path = require("path");
const fs = require("fs");

//// Services
const authenticationService = require("../services/authentication");

//// Models
const {authenticateUser} = require("../services/authentication");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const db = require("express");
const replyModel = require("../models/replyModel");

function getReply(req,res, next) {
    replyModel
        .getReply(parseInt(req.params.replyID))
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

function getRepliesByPostID(req,res, next) {
    console.log(req.params.postID)
    replyModel
        .getRepliesByPostID(parseInt(req.params.postID))
        .then((post) => {
            console.log(post)
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

function createReplyByPostID(req,res, next) {
    replyModel
        .createReply(parseInt(req.params.postID), req.body.comment, parseInt(req.body.userID))
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



module.exports = {
    getReply,
    getRepliesByPostID,
    createReplyByPostID
};
