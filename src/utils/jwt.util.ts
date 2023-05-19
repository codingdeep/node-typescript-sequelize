import jwt, {Secret} from 'jsonwebtoken';


export class JWTUtil {
    private PUBLIC_KEY: Secret | any = process.env.PUBLIC_KEY;
    private PRIVATE_KEY: Secret | any = process.env.PRIVATE_KEY
    private ALGORITHM = process.env.ALGORITHM as Algorithm | any

    public signJWT(object: Object, options?: jwt.SignOptions | undefined) {
        return jwt.sign(
            object,
            this.PRIVATE_KEY,
            {
                ...(options && options)
            }
        )
    }

    public verifyJWT(token: string) {
        try {
            const decoded = jwt.verify(token, this.PRIVATE_KEY);
            return {
                valid: true,
                expired: false,
                decoded
            }
        } catch (e: any) {
            return {
                valid: false,
                expired: e.message === "jwt expired",
                decoded: null
            }
        }
    }
}
