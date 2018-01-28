System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var extractToken;
    return {
        setters: [],
        execute: function () {
            extractToken = (req) => {
                return req.body.token || req.query.token || req.headers['authorization'];
            };
            exports_1("extractToken", extractToken);
        }
    };
});
//# sourceMappingURL=extractToken.js.map