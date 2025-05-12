const { BasicStrategy } = require('passport-http');
const {
    // Assigns the Strategy export to the name JwtStrategy using object
    // destructuring
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Assigning_to_new_variable_names
    Strategy: JwtStrategy,
    ExtractJwt
} = require('passport-jwt');

const { User } = require('../users/models');
const { JWT_SECRET } = require('../config');

const basicStrategy = new BasicStrategy(async (username, password, done) => {
    try {
        console.log('Attempting login for:', username);
        const user = await User.findOne({ username });

        if (!user) {
            console.log('User not found');
            return done(null, false);
        }

        const isValid = await user.validatePassword(password);
        if (!isValid) {
            console.log('Invalid password');
            return done(null, false);
        }

        console.log('Login successful');
        return done(null, user);

    } catch (err) {
        console.error('Error in strategy:', err);
        return done(err);
    }
});

const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: JWT_SECRET,
        // Look for the JWT as a Bearer auth header
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Only allow HS256 tokens - the same as the ones we issue
        algorithms: ['HS256']
    },
    (payload, done) => {
        done(null, payload.user);
    }
);

module.exports = {
    basicStrategy,
    jwtStrategy
};