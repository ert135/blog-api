var extractToken = function (req) {
    return req.body.token || req.query.token || req.headers['authorization'];
};
exports.extractToken = extractToken;
