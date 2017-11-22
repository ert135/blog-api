var getSecret_1 = require('../utils/getSecret');
abstract;
var Route = (function () {
    function Route() {
        this.abstract = registerRoute();
        this.secret = getSecret_1.getSecret();
    }
    return Route;
})();
