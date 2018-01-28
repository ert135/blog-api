System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var getSecret;
    return {
        setters: [],
        execute: function () {
            getSecret = () => {
                return process.env['JWT_SECRET'];
            };
            exports_1("getSecret", getSecret);
        }
    };
});
//# sourceMappingURL=getSecret.js.map