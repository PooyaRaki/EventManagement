import { FastifyReply, FastifyRequest } from 'fastify';

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

export interface IErrorResponseInput {
    stack?: string;
    error: HttpError | RpcErrorResponse;
    response: FastifyReply;
    request: FastifyRequest;
}

export interface ErrorContract {
    meta: {
        date: Date;
        path: string;
        stack?: string;
        statusCode: number;
    },
    errors: {
        key: string;
        message: any;
    };
}