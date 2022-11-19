import { BaseRpcException } from './baseRpc.exception';

export class UnAuthorizedException extends BaseRpcException {
    public constructor(error: string | object)
    {
        super(401, 'Unauthorized', error);
    }
}