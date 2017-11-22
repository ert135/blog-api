var getSecret = function () {
    return process.env['JWT_SECRET'];
};
exports.getSecret = getSecret;
