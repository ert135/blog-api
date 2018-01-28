System.register(["../utils/getSecret"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var getSecret_1, Route;
    return {
        setters: [
            function (getSecret_1_1) {
                getSecret_1 = getSecret_1_1;
            }
        ],
        execute: function () {
            Route = class Route {
                constructor() {
                    this.secret = getSecret_1.getSecret();
                }
            };
            exports_1("Route", Route);
        }
    };
});
//# sourceMappingURL=Route.js.map