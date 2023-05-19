import {Router, Response, Request, NextFunction} from "express";
import authSchema, {AuthInputType} from "./auth.validation";
import AuthService from "./auth.service";
import {JWTUtil} from "@/utils//jwt.util";
import HttpException from "@/utils/exception/http.exception";
import {IController} from "@/utils/interfaces";
import validateResource from "@/middlewares/validate.resource";
import {ResponseWrapper} from "@/utils/response/response.wrapper";

class AuthController implements IController {
    public path = '/users';
    public router = Router();
    private AuthService = new AuthService();
    private JWTUtils = new JWTUtil();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/login`,
            validateResource(authSchema),
            this.login
        )
    }

    private login = async (req: Request<{}, {}, AuthInputType['body']>, res: Response, next: NextFunction) => {
        const response: ResponseWrapper<any> = new ResponseWrapper<any>(res);
        //validate password
        const user = await this.AuthService.validatePassword(req.body);
        if (!user) {
            next(new HttpException(false, 'Username or password is invalid', 401))
        } else {
            // create access token
            const accessToken = this.JWTUtils.signJWT(
                {...user},
                {expiresIn: '2y'}
            );
            //return access token to client
            return response.ok({accessToken})
        }
    }
}

export default AuthController;