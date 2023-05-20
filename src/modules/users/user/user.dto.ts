import UserRoleModel from "./domain/user.role.model";

export interface IUdto {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    roles: UserRoleModel[]
}

export const toDto = (User: any) => {
    return {
        id: User.id,
        first_name: User.first_name,
        last_name: User.last_name,
        email: User.email,
        roles: User.roles
    }
}