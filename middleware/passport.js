const keys = require('../config/keys');
const { User } = require('../models/User');

const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new jwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('username id')

                if(user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch(e) {
                console.log(e);
            }
        })
    )
}