System.register(["express", "sequelize-typescript", "morgan", "body-parser", "./routes/PostRoute", "./routes/UserRoute", "./routes/SignupRoute", "./routes/AuthRoute", "express-bearer-token"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var express, sequelize_typescript_1, logger, bodyParser, PostRoute_1, UserRoute_1, SignupRoute_1, AuthRoute_1, bearerToken, App;
    return {
        setters: [
            function (express_1) {
                express = express_1;
            },
            function (sequelize_typescript_1_1) {
                sequelize_typescript_1 = sequelize_typescript_1_1;
            },
            function (logger_1) {
                logger = logger_1;
            },
            function (bodyParser_1) {
                bodyParser = bodyParser_1;
            },
            function (PostRoute_1_1) {
                PostRoute_1 = PostRoute_1_1;
            },
            function (UserRoute_1_1) {
                UserRoute_1 = UserRoute_1_1;
            },
            function (SignupRoute_1_1) {
                SignupRoute_1 = SignupRoute_1_1;
            },
            function (AuthRoute_1_1) {
                AuthRoute_1 = AuthRoute_1_1;
            },
            function (bearerToken_1) {
                bearerToken = bearerToken_1;
            }
        ],
        execute: function () {
            App = class App {
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
            };
            exports_1("App", App);
        }
    };
});
//# sourceMappingURL=app.js.map