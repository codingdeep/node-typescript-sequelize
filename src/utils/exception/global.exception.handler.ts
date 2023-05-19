import {Request, Response, NextFunction} from 'express';
import HttpException from "@/utils/exception/http.exception";
import ResourceNotfoundException from "@/utils/exception/resource.notfound.exception";
import ResourceDuplicateException from "@/utils/exception/resource.duplicate.exception";
import {ResponseWrapper} from "@/utils/response/response.wrapper";

function GlobalExceptionHandler(
    error: ResourceNotfoundException | HttpException | ResourceDuplicateException,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const response: ResponseWrapper<ResourceNotfoundException> = new ResponseWrapper<ResourceNotfoundException>(res);
    res.status(error.statusCode).send(response.sendException(error))
}

export default GlobalExceptionHandler;