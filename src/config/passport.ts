import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../modules/user/user.model";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "change_me",
};

passport.use(new JwtStrategy(opts, async (payload: any, done) => {
  try {
    const user = await UserModel.findById(payload.id).exec();
    if (!user) return done(null, false);
    // Also check that token matches currentToken if you want
    // but we'll check in middleware later for single-device enforcement
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));

export default passport;
