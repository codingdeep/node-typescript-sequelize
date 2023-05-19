class HttpException extends Error {
    public status: boolean;
    public message: string | any
    public statusCode: number

    constructor(status: boolean, message: string | any, statusCode: number) {
        super(message);
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default HttpException;