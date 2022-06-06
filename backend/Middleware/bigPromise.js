const CustomError = require('../Utils/CustomError');

module.exports = (func) => (req, res, next) =>
    Promise.resolve(func(req, res, next)).catch(
        next(CustomError(res, error.message, 401)),
    );
