import UserModel, {UserInput} from "../../models/user.model";
import DbConnection from "../../config/db/db.connection";
import RoleModel from "../../models/role.model";
import UserRoleModel from "../../models/user.role.model";
import roleModel from "../../models/role.model";
import {omit} from "lodash";

class UserService extends Error {

    public register = async (input: UserInput) => {
        //initialize transaction
        let transaction = await DbConnection.getConnection().transaction();
        try {
            //create new user
            const user = await UserModel.create(input, {transaction});

            //assign roles
            const userRoles = input.roles.map((role: RoleModel) => UserRoleModel.create({
                userId: user.id,
                roleId: role.id
            }, {transaction}))
            await Promise.all(userRoles);

            //transaction success
            await transaction.commit();

            //find user with roles
            const userWithRoles: UserModel | null = await UserModel.findOne({
                where: {id: user.id},
                include: [{model: roleModel as any, as: 'roles'}]
            });
            //before return the response remove password
            return omit(userWithRoles?.toJSON(), 'password')

        } catch (e: any) {
            if (transaction) {
                await transaction.rollback();
            }
            throw new Error(e)
        }
    }

    public findByEmail = async (email: string) => {
        return await UserModel.findOne({where: {email: email}})
    }

    public findAllUser = async () => {
        try {
            return await UserModel.findAll({
                include: [{model: RoleModel as any, as: 'roles'}],
                attributes: {
                    exclude: ['password']
                }
            })
        } catch (e: any) {
            throw new Error(e)
        }
    }

}

export default UserService;