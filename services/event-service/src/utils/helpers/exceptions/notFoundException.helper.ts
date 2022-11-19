import { BaseRpcException } from './baseRpcException.helper';

export class NotFoundException extends BaseRpcException {
    public constructor(error: string | object)
    {
        super(404, 'Not Found', error);
    }
}