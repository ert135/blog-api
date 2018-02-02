"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSecret_1 = require("../utils/getSecret");
class Route {
    constructor() {
        this.secret = getSecret_1.getSecret();
    }
}
exports.Route = Route;
;
