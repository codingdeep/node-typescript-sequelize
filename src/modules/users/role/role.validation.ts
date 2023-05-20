import {number, object, string, TypeOf} from "zod";

const rolePayload = {
    body: object({
        name: string({required_error: 'Name is required'}).min(2, 'Name must not be empty')
    })
}

const params = {
    params: object({
        id: string({required_error: 'Role id is required'})
    })
}

export const roleBody = object(rolePayload);
export const roleParams = object({...params});
export const updateRolePayload = object({...rolePayload, ...params});

export type RoleParams = TypeOf<typeof roleParams>;
export type RoleBody = TypeOf<typeof roleBody>;
export type UpdateRoleBody = TypeOf<typeof updateRolePayload>;


