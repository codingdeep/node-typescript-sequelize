import {Response} from "express";
import {CustomResponse} from "@/utils/response/custom.response";
import ResourceNotfoundException from "@/utils/exception/resource.notfound.exception";
import HttpException from "@/utils/exception/http.exception";
import ResourceDuplicateException from "@/utils/exception/resource.duplicate.exception";

export class ResponseWrapper<T extends object> {
    public res: Response

    constructor(response: Response) {
        this.res = response;
    }

    //
    // public handle(response: Response<T>): Response<T> {
    //     //return this.res.send(response)
    // }

    public created(): Response {
        return this.res;
    }

    public ok(response: T): Response<CustomResponse<T>> {
        const requiredResponse = {
            timeStamp: new Date(),
            status: true,
            statusCode: 200,
            data: response
        }
        return this.res.send(requiredResponse)
    }

    public unauthorized(): Response {
        return this.res;
    }

    // public forbidden(response: T) {
    //     return this.res;
    // }

    public sendException(exception: ResourceNotfoundException | HttpException | ResourceDuplicateException): CustomResponse<T> {
        const requiredResponse = {
            timeStamp: new Date(),
            status: false,
            statusCode: exception.statusCode,
            errors: {error: exception.message, stack: exception.stack} as T
        }
        return requiredResponse
    }

}