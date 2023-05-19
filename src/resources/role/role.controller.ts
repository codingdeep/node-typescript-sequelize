import {IController} from "@/utils/interfaces";
import {NextFunction, Router, Request, Response} from "express";
import {ResponseWrapper} from "@/utils/response/response.wrapper";
import RoleService from "@/resources/role/role.service";
import {RoleOutPut} from "../../models/role.model";
class RoleController implements IController{
    public path = '/role';
    public router = Router();
    private RoleService = new RoleService();
    constructor() {
        this.routesInit()
    }
    private routesInit():void{
        this.router.post(this.path, this.createRole)
    }
    private createRole = async (req: Request, res: Response, next: NextFunction)=> {
        const response: ResponseWrapper<RoleOutPut> = new ResponseWrapper(res);
        try{
            return response.ok(await this.RoleService.createRole(req.body))
        }catch (e: any){
        }
    }
}
export default RoleController;