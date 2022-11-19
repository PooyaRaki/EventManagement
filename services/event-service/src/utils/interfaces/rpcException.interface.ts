export interface RpcExceptionResponse {
    message: string;
    statusCode: number;
    error: string | object;
}