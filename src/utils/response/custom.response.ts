export interface CustomResponse<T extends object> {
    status: boolean;
    statusCode: number;
    message?: string;
    developerMessage?: string;
    reason?: string;
    totalPages?: number;
    totalRecords?: number;
    lastPage?: boolean;
    data?: T,
    errors?: any
}