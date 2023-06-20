//// Modules
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const db = require("./services/database").config;

//// Middlewares
const { notFound, errorHandler } = require('./middlewares')

//// App
const app = express();
const port = 3000;

//// Routersr
const apiRouter = require('./routes/api');
const {authenticateJWT} = require("./services/authentication");

//// App - Configuration
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authenticateJWT);

//// App - Routes
app.get('/', (req, res) => {
  res.json({
    message: 'CyberCanvas API! 🦾🧪🌃☠🧬👩‍💻🦿 '
  });
});
app.use('/api', apiRouter);
//app.use(express.static('public'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;

app.listen(port, () => {
  console.log(`Example app listening at
http://localhost:${port}`);
});