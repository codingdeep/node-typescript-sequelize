import {DataType, Model, Table, Column, BelongsToMany, BeforeCreate} from "sequelize-typescript";
import RoleModel from "../../role/domain/role.model";
import UserRoleModel from "./user.role.model";
import bcrypt from "bcrypt";

interface UserAttributes {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    roles: RoleModel[],
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export interface UserInput extends UserAttributes {
}

@Table({tableName: 'usr'})
class UserModel extends Model<UserAttributes, UserInput> implements UserAttributes {

    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id!: number;

    @Column({type: DataType.STRING})
    first_name!: string;

    @Column({type: DataType.STRING})
    last_name!: string;


    @Column({type: DataType.STRING, unique: true})
    email!: string

    @Column({type: DataType.STRING})
    password!: string;

    @BelongsToMany(() => RoleModel, () => UserRoleModel)
    roles!: RoleModel[]

    @BeforeCreate
    static async hasPassword(instance: UserModel) {
        //const salt = bcrypt.genSalt(10);
        // const hash = bcrypt.hashSync(user.getDataValue('password'), await salt)
        // user.setDataValue("password", hash)
        const hash = await bcrypt.hash(instance.password, 10);
        instance.password = hash;
    }

    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }


}


export default UserModel;