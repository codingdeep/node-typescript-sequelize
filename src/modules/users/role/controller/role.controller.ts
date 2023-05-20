import {IController} from "@/utils/interfaces";
import {NextFunction, Router, Request, Response} from "express";
import {ResponseWrapper} from "@/utils/response/response.wrapper";
import RoleService from "../service/role.service";
import {IRdto, toDto} from "../role.dto";
import HttpException from "@/utils/exception/http.exception";
import RoleModel from "../domain/role.model";
import QueryHelper from "../../../common/queryHelper";
import ResourceDuplicateException from "@/utils/exception/resource.duplicate.exception";
import {RoleBody, roleParams, RoleParams, UpdateRoleBody, updateRolePayload} from "../role.validation";
import validateResource from "@/middlewares/validate.resource";
import ResourceNotfoundException from "@/utils/exception/resource.notfound.exception";

class RoleController implements IController {
    public path = '/role';
    public router = Router();
    private RoleService = new RoleService();
    private QueryHelper = new QueryHelper(RoleModel)

    constructor() {
        this.routesInit()
    }

    private routesInit(): void {
        this.router.post(this.path, this.createRole);
        this.router.get(`${this.path}/:id`, validateResource(roleParams), this.findById);
        this.router.put(`${this.path}/update/:id`, validateResource(updateRolePayload), this.updateRole);
    }

    //create new role
    private createRole = async (req: Request<{}, {}, RoleBody['body']>, res: Response, next: NextFunction) => {
        const response: ResponseWrapper<IRdto> = new ResponseWrapper<IRdto>(res);
        const query = this.QueryHelper.baseQuery().where['name'] = req.body.name;
        const role = await this.QueryHelper.exists(query);
        if (role === true) {
            next(new ResourceDuplicateException('Role', 'role', req.body.name, 409));
            return;
        }
        try {
            const role: IRdto = await this.RoleService.createRole(req.body);
            return response.ok(toDto(role));
        } catch (e: any) {
            next(new HttpException(false, e, 400))
        }
    }

    //fetch single role
    private findById = async (req: Request<RoleParams['params']>, res: Response, next: NextFunction) => {
        const response: ResponseWrapper<IRdto> = new ResponseWrapper<IRdto>(res);
        const id = req.params.id
        try {
            const role: IRdto | null = await this.RoleService.findById(id);
            return response.ok(toDto(role));
        } catch (e: any) {
            next(new ResourceNotfoundException('Role', 'role id', id, 400))
        }
    }

    //updating role
    private updateRole = async (req: Request<UpdateRoleBody['params'], {}, UpdateRoleBody['body']>, res: Response, next: NextFunction) => {
        const response: ResponseWrapper<IRdto> = new ResponseWrapper<IRdto>(res);
        const id = req.params.id
        const role = await this.RoleService.findById(id);
        if (!role) {
            next(new ResourceNotfoundException('Role', 'role id', id, 400))
        }
        try {
            if (role instanceof RoleModel) {
                role['name'] = req.body.name
            }
            return response.ok(toDto(await role?.save()));

        } catch (e: any) {
            next(new HttpException(false, e, 400));
        }
    }
}

export default RoleController;