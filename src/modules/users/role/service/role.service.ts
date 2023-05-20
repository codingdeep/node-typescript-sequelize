import RoleModel from "../domain/role.model";
import {IRdto} from "../role.dto";
import QueryHelper from "../../../common/queryHelper";

class RoleService {

    private QueryHelper = new QueryHelper(RoleModel);
    public createRole = async (input: any): Promise<IRdto> => {

        try {
            return await RoleModel.create(input)
        } catch (e: any) {
            throw new Error(e)
        }
    }

    public findById = async (id: string) => {
        const query = this.QueryHelper.baseQuery();
        query.where['id'] = id;
        try {
            return await RoleModel.findOne(query);
        } catch (e: any) {
            throw new Error(e)
        }
    }

    public update = async (id: string, role: Omit<IRdto, 'id'>) => {
        const query = this.QueryHelper.baseQuery();
        query.where['id'] = id;
        query.where['returning'] = true;
        try {
            return await RoleModel.update(role, {returning: true, where: {id: id}});
        } catch (e: any) {
            throw new Error(e)
        }
    }
}

export default RoleService;