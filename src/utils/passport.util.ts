import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import UserModel from "../modules/users/user/domain/user.model";
import {NextFunction} from "express";
import RoleModel from "../modules/users/role/domain/role.model";

const privateKey: any = process.env.PRIVATE_KEY;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: privateKey
};

const passportUtil = (passport: any) => {
    passport.use('jwt', new JwtStrategy(options, async function (payload: any, done: any) {
        try {
            const user = await UserModel.findByPk(payload.id, {include: [{model: RoleModel as any, as: 'roles'}]});
            if (user) {
                // User found, pass it to the route handler
                return done(null, user);
            } else {
                return done(null, false);
            }
            // User not found
        } catch (error) {
            return done(error, false);
        }
    }))
}

export default passportUtil