"use strict";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { auth } = require('express-openid-connect');
const mongoose = require('mongoose');

// Create Express Server
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.static("./public"));
app.use(morgan("tiny"));
app.use(helmet({}));
app.use(cookieParser());

//Set up CORS
const corsOptions = {
    origin: true,
    credentials: true,
    preflightContinue: true,
    exposedHeaders: ["x-access-token, Authorization, Authentication, withCredentials, credentials, Set-Cookie"],
    allowedHeaders: ["X-Requested-With,content-type,Content-Type, Authorization,Authentication,withCredentials, Content-Length, X-Requested-With, Accept, x-access-token,credentials, Origin, X-Content-Type-Options"],
    methods: ["GET, POST, OPTIONS, PUT, PATCH, DELETE"],
};
app.use(cors(corsOptions));

// Setting up JSON Parser
var jsonParser = bodyParser.json();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

//Setup Auth0 Authentication
const auth0Config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.APP_BASE_URL + "/auth",
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    secret: process.env.AUTH0_SECRET,
};
app.use(auth(auth0Config));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes Declaration
const userRoutes = require("./routes/userHandling");

// Routes
app.use("/users", userRoutes);

//Error Handling
app.use((req, res, next) => {
    const error = new Error("Not Found");
    console.log(`Unrecognised Request: ${req.originalUrl}`);
    error.status = 404;
    next(error);
    res.status(404).json({
        status: 404,
        message: "Not Found",
    });
});

// Start Listening
var server = app.listen(PORT, () => {
    console.info(`server is running on port ${PORT}`);
    if (process.send) {
        process.send("ready");
    }
});

process.on("SIGINT", () => {
    console.info("SIGINT signal received");
    server.close(function (err) {
        if (err) {
            console.error(err);
        }
        process.exit(err ? 1 : 0);
    });
});

process.on("SIGTERM", () => {
    console.info("SIGTERM signal received");
    server.close(function (err) {
        if (err) {
            console.error(err);
        }
        process.exit(err ? 1 : 0);
    });
});