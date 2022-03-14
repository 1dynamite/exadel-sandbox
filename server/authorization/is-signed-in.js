const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const users = require("../database/db.users");

const jwtCallback = (payload, done) => {
  const user = users.getUserByID(payload.id);

  if (user)
    return done(null, {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    });

  return done(null, false);
};

const init = passport.initialize();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, jwtCallback));

const passAuth = passport.authenticate("jwt", {
  session: false,
});

module.exports = () => [init, passAuth];
