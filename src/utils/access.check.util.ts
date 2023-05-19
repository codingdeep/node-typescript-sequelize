import {NextFunction, Response, Request} from "express";
import HttpException from "@/utils/exception/http.exception";

class AccessCheckUtil extends Error {

    public superAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user.roles.find((role: any) => role.name === 'SUPER_ADMIN');
            if (!user) {
                next(new HttpException(false, 'You are not authorized to perform this action', 403))
            }
            next()
        } catch (err: any) {
            next(new HttpException(false, 'Something went wrong!', 500))
            next()
        }
    }
}

export default AccessCheckUtil