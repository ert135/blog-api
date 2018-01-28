System.register(["jsonwebtoken", "express", "../utils/extractToken", "./Route"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var jwt, express, extractToken_1, Route_1, UserRoute;
    return {
        setters: [
            function (jwt_1) {
                jwt = jwt_1;
            },
            function (express_1) {
                express = express_1;
            },
            function (extractToken_1_1) {
                extractToken_1 = extractToken_1_1;
            },
            function (Route_1_1) {
                Route_1 = Route_1_1;
            }
        ],
        execute: function () {
            UserRoute = class UserRoute extends Route_1.Route {
                constructor() {
                    super();
                    this.router = express.Router();
                }
                registerRoute() {
                    return this.router.get('/', (req, res, next) => {
                        jwt.verify(extractToken_1.extractToken(req), this.secret, (err, decoded) => {
                        });
                    });
                }
            };
            exports_1("UserRoute", UserRoute);
        }
    };
});
//# sourceMappingURL=UserRoute.js.map