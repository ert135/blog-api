System.register(["aws-sdk"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AWS;
    return {
        setters: [
            function (AWS_1) {
                AWS = AWS_1;
            }
        ],
        execute: function () {
            // Load credentials and set region from JSON file
            AWS.config.loadFromPath('../config/awsconfig.json');
        }
    };
});
//# sourceMappingURL=database.js.map