import { ExtractJwt, Strategy } from "passport-jwt";
import db from "../database/db.connect";
import { UserType } from "../utils/type.interface";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const jwtStrategy = new Strategy(opts, (jwt_payload, done) => {
  db<UserType>("users")
    .where({ id: jwt_payload.id })
    .first()
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => console.log(err));
});
