import {AnyZodObject, z} from "zod";
import {NextFunction, Request, Response} from "express";
import HttpException from "@/utils/exception/http.exception";

const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next();
    } catch (e: any) {
        next(new HttpException(false, e.issues, 400))
    }
}
export default validateResource;