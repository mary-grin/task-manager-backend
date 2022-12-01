const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
    try {
        const cookie = req.cookies['jwt'];
        if (!cookie) {
            return res.status(401).send({ status: false, message: 'Unauthenticated' });
        }
        req.user = jwt.verify(cookie, keys.jwt);
        next();
    } catch (e) {
        return res.status(401).send({ message: 'Unauthenticated', error: e.message, status: false });
    }
}
