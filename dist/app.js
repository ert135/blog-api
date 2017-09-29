"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const PostRoute_1 = require("./routes/PostRoute");
const UserRoute_1 = require("./routes/UserRoute");
const SignupRoute_1 = require("./routes/SignupRoute");
const AuthRoute_1 = require("./routes/AuthRoute");
const bearerToken = require("express-bearer-token");
class App {
    constructor() {
        this.express = express();
        this.router = express.Router();
        this.db_name = 'blog';
        this.connectDatabase();
        this.registerMiddleware();
        this.registerRoutes();
        this.registerErrorHandlers();
    }
    connectDatabase() {
        //provide a sensible default for local development
        let mongodb_connection_string = "mongodb://localhost:27017/" + this.db_name;
        //take advantage of openshift env vars when available: need to set a enviroment var on the aws instance and save its image for reuse 
        // if (process.env.OPENSHIFT_MONGODB_DB_URL) {
        // 	mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + this.db_name;
        // }
        mongoose.connect(mongodb_connection_string);
        const db = mongoose.connection;
        db.on("error", function (err) {
            console.error("db connection error", err);
        });
        db.once("open", function () {
            console.log("db connection successful");
        });
    }
    registerMiddleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bearerToken());
        //setup CORS and options response
        this.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, Z-Requested-With, Content-Type, Accept, Authorization");
            if (req.method === "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE,GET");
                return res.status(200).json({});
            }
            next();
        });
    }
    registerRoutes() {
        this.express.use("/posts", new PostRoute_1.PostRoute().registerRoute(this.router));
        this.express.use("/signup", new SignupRoute_1.SignupRoute().registerRoute(this.router));
        this.express.use("/users", new UserRoute_1.UserRoute().registerRoute(this.router));
        this.express.use('/auth', new AuthRoute_1.AuthRoute().registerRoute(this.router));
    }
    registerErrorHandlers() {
        this.express.use((req, res, next) => {
            var err = new Error("Not Found");
            err.message = err.message;
            err.status = 404;
            next(err);
        });
        this.express.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.json({
                error: {
                    message: err.message || err
                }
            });
        });
    }
}
exports.App = App;
