import IController from "@/utils/interfaces/controller.interface";
import {NextFunction, Router, Request, Response} from "express";
import {ResponseWrapper} from "@/utils/response/response.wrapper";
import UserService from "../service/user.service";
import ResourceNotfoundException from "@/utils/exception/resource.notfound.exception";
import RoleModel from "../../role/domain/role.model";
import HttpException from "@/utils/exception/http.exception";
import userValidation, {UserInputType} from "../user.validation";
import validateResource from "@/middlewares/validate.resource";
import ResourceDuplicateException from "@/utils/exception/resource.duplicate.exception";
import UserModel from "../domain/user.model";
import passport from "passport";
import AccessCheckUtil from "@/utils/access.check.util";

class UserController implements IController {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();
    private AccessCheckUtil = new AccessCheckUtil()

    constructor() {
        this.routesInit();
    }

    private routesInit(): void {
        this.router.post(this.path, validateResource(userValidation), this.register);
        this.router.get(this.path, passport.authenticate('jwt', {session: false}), this.AccessCheckUtil.superAdmin, this.getUsers)
    }

    //create user with roles
    private register = async (req: Request<{}, {}, UserInputType['body']>, res: Response, next: NextFunction) => {

        const {body} = req;

        const response: ResponseWrapper<any> = new ResponseWrapper(res);

        //duplicate check
        const user = await this.UserService.findByEmail(req.body.email);
        if (user) {
            next(new ResourceDuplicateException('User', 'username', req.body.email, 409));
            next()
        }
        //if not duplicate
        try {
            const roles: RoleModel[] = await RoleModel.findAll({where: {id: req.body.roles.map((role: RoleModel) => role.id)}});
            if (roles.length === body.roles.length) {
                return response.ok(await this.UserService.register(req.body))
            } else {
                next(new ResourceNotfoundException('Role', 'roleId', '1', 404))
            }
        } catch (e: any) {
            next(new HttpException(false, e.message, 500))
        }
    }
    //get all users with roles
    private getUsers = async (req: Request, res: Response, next: NextFunction) => {
        const response: ResponseWrapper<UserModel[]> = new ResponseWrapper<UserModel[]>(res);
        try {
            return response.ok(await this.UserService.findAllUser());
        } catch (e: any) {
            next(new HttpException(false, e.message, 404))
        }
    }
}

export default UserController;