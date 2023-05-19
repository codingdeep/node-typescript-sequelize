import {DataType, Model, Table, Column, BelongsToMany} from "sequelize-typescript";
import {Optional} from "sequelize";
import UserModel from "./user.model";
import UserRoleModel from "./user.role.model";
import userModel from "./user.model";

interface RoleAttributes {
    id?: number;
    name?: string;
    users?: UserModel[];
}

export interface RoleInput extends Optional<RoleAttributes, 'id'> {
}

export interface RoleOutPut extends Optional<RoleAttributes, 'id'> {
}

@Table({tableName: 'role', timestamps: false})
class RoleModel extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id!: number;
    @Column({type: DataType.STRING, allowNull: false})
    name!: string;

    @BelongsToMany(() => UserModel, () => UserRoleModel)
    users!: userModel[]
}

export default RoleModel;