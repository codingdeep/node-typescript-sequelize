import {omit} from "lodash";
import UserModel from "../../models/user.model";
import RoleModel from "../../models/role.model";

class AuthService {
    // public async login(input: AuthInputType["body"]): Promise<any> {
    //     try {
    //         return await UserModel.findOne({where: {email: input.email}});
    //     } catch (e: any) {
    //         throw new Error(e)
    //     }
    // }

    public async validatePassword({email, password}: { email: string, password: string }): Promise<any> {
        const user = await UserModel.findOne({
            where: {email: email},
            include: {model: RoleModel as any, as: 'roles'}
        });
        if (!user) return false;
        const valid = await user.comparePassword(password);
        if (!valid) return false;
        return omit(user.toJSON(), 'password');
    }
}

export default AuthService;