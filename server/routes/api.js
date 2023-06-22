//// Modules
const express = require('express');

//// Routes
const router = express.Router();

//// Routers
const usersRouter = require("./users");
const postsRouter = require("./posts");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const repliesRouter = require("./replies");
const app = require("../app");

//// Use Route Files

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/replies", repliesRouter);
router.get('/', (req, res) => {
    res.json({
        message: 'CyberCanvas API api.js! 🦾🧪🌃☠🧬👩‍💻🦿'
    });
});
//// Exports
module.exports = router;