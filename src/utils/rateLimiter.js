const rateLimit = require('express-rate-limit');
const createHttpError = require('http-errors');

const createRateLimiter = ({ windowMs, max }) => {
    console.log("rate limer -> ", { windowMs, max })
    return rateLimit({
        // In mins
        windowMs: windowMs * 60 * 1000,
        max,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
            next(createHttpError.TooManyRequests('You have exceeded the request limit. Please try again later.'));
        }
    });
};

module.exports = {
    createRateLimiter
};
