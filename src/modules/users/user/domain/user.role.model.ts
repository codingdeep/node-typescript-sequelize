import {DataType, Model, Column, Table, ForeignKey, BelongsTo} from "sequelize-typescript";
import UserModel from "./user.model";
import RoleModel from "../../role/domain/role.model";

interface UserRoleAttributes {
    userId?: number;
    roleId?: number;
}

export interface UserRoleInput extends UserRoleAttributes {
}

@Table({tableName: 'user_role', timestamps: false})
class UserRoleModel extends Model<UserRoleAttributes, UserRoleInput> implements UserRoleAttributes {

    @ForeignKey(() => UserModel)
    @Column
    userId!: number

    @ForeignKey(() => RoleModel)
    @Column
    roleId!: number


    @BelongsTo(() => UserModel)
    user!: UserModel

    @BelongsTo(() => RoleModel)
    role!: RoleModel
}

export default UserRoleModel;