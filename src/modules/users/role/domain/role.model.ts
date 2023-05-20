import {DataType, Model, Table, Column, BelongsToMany} from "sequelize-typescript";
import UserModel from "../../user/domain/user.model";
import UserRoleModel from "../../user/domain/user.role.model";
import userModel from "../../user/domain/user.model";
import {IRdto} from "../role.dto";

@Table({tableName: 'role', timestamps: false})
class RoleModel extends Model<IRdto, Omit<IRdto, 'id'>> implements IRdto {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id!: number;
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name!: string;

    @BelongsToMany(() => UserModel, () => UserRoleModel)
    users!: userModel[]
}

export default RoleModel;