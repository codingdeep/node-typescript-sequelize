import RoleModel, {RoleOutPut} from "../../models/role.model";

class RoleService{
   public createRole = async (input: any):Promise<RoleOutPut> =>{
        try{
           return await RoleModel.create(input)
        }catch (e:any){
            throw new Error(e)
        }
   }
}
export default RoleService;