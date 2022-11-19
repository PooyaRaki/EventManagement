import { BaseRpcException } from './baseRpcException.helper';

export class BadRequestException extends BaseRpcException {
    public constructor(error: string | object)
    {
        super(400, 'Bad Request', error);
    }
}