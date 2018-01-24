"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Sequelize = require("sequelize");
var logger = require("morgan");
var bodyParser = require("body-parser");
var PostRoute_1 = require("./routes/PostRoute");
var UserRoute_1 = require("./routes/UserRoute");
var SignupRoute_1 = require("./routes/SignupRoute");
var AuthRoute_1 = require("./routes/AuthRoute");
var bearerToken = require("express-bearer-token");
var App = /** @class */ (function () {
    function App() {
        this.express = express();
        this.router = express.Router();
        this.db_name = 'blog';
        this.connectDatabase();
        this.registerMiddleware();
        this.registerRoutes();
        this.registerErrorHandlers();
    }
    App.prototype.connectDatabase = function () {
        console.log('Connecting to database...');
        var sequelize = new Sequelize('blog', 'postgres', 'saltwater9', {
            host: 'localhost',
            dialect: 'postgres',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
    };
    App.prototype.registerMiddleware = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bearerToken());
        //setup CORS and options response
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, Z-Requested-With, Content-Type, Accept, Authorization");
            if (req.method === "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE,GET");
                return res.status(200).json({});
            }
            next();
        });
    };
    App.prototype.registerRoutes = function () {
        this.express.use("/posts", new PostRoute_1.PostRoute().registerRoute());
        this.express.use("/signup", new SignupRoute_1.SignupRoute().registerRoute());
        this.express.use("/users", new UserRoute_1.UserRoute().registerRoute());
        this.express.use('/auth', new AuthRoute_1.AuthRoute().registerRoute());
    };
    App.prototype.registerErrorHandlers = function () {
        this.express.use(function (req, res, next) {
            var err = new Error("Not Found");
            err.message = err.message;
            err.status = 404;
            next(err);
        });
        this.express.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                error: {
                    message: err.message || err
                }
            });
        });
    };
    return App;
}());
exports.App = App;
