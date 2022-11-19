import { BaseRpcException } from './baseRpc.exception';

export class NotFoundException extends BaseRpcException {
    public constructor(error: string | object)
    {
        super(404, 'Not Found', error);
    }
}