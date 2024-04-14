const HttpError = require("../models/http-error");
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.method ==='OPTIONS')
    {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            const error = new HttpError('Authentication Failed', 403);
            return next(error);
        }
        const decodedToken = jwt.verify(token,'supersecret_dont_share')
        req.shopData = {shopId: decodedToken.shopId};
        next();
    }
    catch {
        const error = new HttpError('Authentication Failed', 403);
        return next(error);
    }
}