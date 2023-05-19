import {get} from "lodash";
import {Request, Response, NextFunction} from "express";
import {JWTUtil} from "@/utils/jwt.util";

const userDeserializer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );
    if (!accessToken) {
        return next();
    }

    const {decoded, expired} = new JWTUtil().verifyJWT(accessToken);
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    return next();
};

export default userDeserializer;