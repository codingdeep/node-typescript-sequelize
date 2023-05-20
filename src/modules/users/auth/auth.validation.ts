import {object, string, TypeOf} from "zod";

const AuthValidation = object({
    body: object({

        email: string({
            required_error: 'Username is required'
        }).email('Please enter a valid username'),
        password: string({
            required_error: 'Please enter a valid password'
        }).min(6, 'Password is too small - should be at least 6 chars'),

    })
});


export default AuthValidation;


export type AuthInputType = TypeOf<typeof AuthValidation>