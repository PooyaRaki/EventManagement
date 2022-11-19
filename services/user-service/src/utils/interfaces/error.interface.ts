export interface HttpError {
    error: string;
    message: string;
    statusCode: number;
}

export interface RpcErrorResponse {
    error: string;
    message: string[];
    statusCode: number;
}

export interface RpcError {
    name: string;
    status: number;
    options: object;
    message: string;
    response: RpcErrorResponse;
}