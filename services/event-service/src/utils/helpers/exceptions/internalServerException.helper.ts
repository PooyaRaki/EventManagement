import { BaseRpcException } from './baseRpcException.helper';

export class InternalServerErrorException extends BaseRpcException {
    public constructor(error: string | object)
    {
        super(500, 'Internal Server Error', error);
    }
}