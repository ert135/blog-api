"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const sequelize_typescript_1 = require("sequelize-typescript");
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
        console.log('Connecting to database...');
        const sequelize = new sequelize_typescript_1.Sequelize({
            database: 'blog',
            dialect: 'postgres',
            username: 'root',
            password: '',
            modelPaths: [__dirname + '/dist/models']
        });
        console.log('database connected!!!');
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
        this.express.use("/posts", new PostRoute_1.PostRoute().registerRoute());
        this.express.use("/signup", new SignupRoute_1.SignupRoute().registerRoute());
        this.express.use("/users", new UserRoute_1.UserRoute().registerRoute());
        this.express.use('/auth', new AuthRoute_1.AuthRoute().registerRoute());
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
