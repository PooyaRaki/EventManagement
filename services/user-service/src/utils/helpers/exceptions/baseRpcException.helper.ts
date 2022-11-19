import { RpcException } from '@nestjs/microservices';
import { RpcExceptionResponse } from '@utils/interfaces';

export class BaseRpcException extends RpcException {
    public response: any;
    public statusCode: number;

    public constructor(status: number, message: string, error: string | object) {
        super(error);

        this.message = message;
        this.statusCode = status;
        this.response = this.buildResponse();
    }

    private buildResponse(): RpcExceptionResponse
    {
        return {
            message: this.message,
            error: this.getError(),
            statusCode: this.statusCode,
        }
    }
}