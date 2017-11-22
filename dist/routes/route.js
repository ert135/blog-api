"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getSecret_1 = require("../utils/getSecret");
var Route = /** @class */ (function () {
    function Route() {
        this.secret = getSecret_1.getSecret();
    }
    return Route;
}());
exports.Route = Route;
