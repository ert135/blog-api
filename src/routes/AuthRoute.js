System.register(["express", "./Route"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var express, Route_1, AuthRoute;
    return {
        setters: [
            function (express_1) {
                express = express_1;
            },
            function (Route_1_1) {
                Route_1 = Route_1_1;
            }
        ],
        execute: function () {
            AuthRoute = class AuthRoute extends Route_1.Route {
                constructor() {
                    super();
                    this.router = express.Router();
                }
                registerRoute() {
                    return this.router.post("/", (req, res, next) => {
                        if (req.body.email && req.body.password) {
                        }
                        else {
                            var err = new Error('Email and password are required');
                            err.status = 401;
                            next(err);
                        }
                    });
                }
            };
            exports_1("AuthRoute", AuthRoute);
        }
    };
});
//# sourceMappingURL=AuthRoute.js.map