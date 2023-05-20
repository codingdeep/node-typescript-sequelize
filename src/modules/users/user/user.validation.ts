import {array, object, string, TypeOf, z} from "zod";

export const roleSchema: any = z.object({
    id: z.number(),
    name: z.string(),
});
const UserValidation = object({
    body: object({
        first_name: string({required_error: 'First Name is required'}).min(1, {message: 'Please enter a valid first name'}),
        last_name: string({required_error: 'Last name is required'}).min(1, {message: 'Please enter a valid last name'}),
        email: string({required_error: 'Email is required'}).email("Please enter a valid email").trim().transform((val) => val.split('@')[1]),
        roles: z.array(roleSchema),
        password: string({required_error: 'Password is required'}).min(6, 'Password is too small - should be at least 6 chars'),
        confirmPassword: string({required_error: 'Confirm password is required'})
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Password doesn't match",
        path: ['confirmPassword']
    })

})

export type UserInputType = Omit<TypeOf<typeof UserValidation>, 'id'>

export default UserValidation;
