System.register(["express", "./Route"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var express, Route_1, SignupRoute;
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
            SignupRoute = class SignupRoute extends Route_1.Route {
                constructor() {
                    super();
                    this.router = express.Router();
                }
                registerRoute() {
                    return this.router.post('/', (req, res, next) => {
                        if (req.body.name &&
                            req.body.email &&
                            req.body.password &&
                            req.body.confirmpassword) {
                            if (req.body.password !== req.body.confirmpassword) {
                                let err = new Error('Passwords do not match');
                                err.status = 400;
                                return next(err);
                            }
                            let userData = {
                                email: req.body.email,
                                name: req.body.name,
                                password: req.body.password,
                                type: 'user'
                            };
                        }
                        else {
                            let err = new Error('All Fields required');
                            err.status = 400;
                            return next(err);
                        }
                    });
                }
            };
            exports_1("SignupRoute", SignupRoute);
        }
    };
});
//# sourceMappingURL=SignupRoute.js.map