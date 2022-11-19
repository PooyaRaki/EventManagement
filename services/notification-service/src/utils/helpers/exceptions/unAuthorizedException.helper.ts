import { BaseRpcException } from './baseRpcException.helper';

export class UnAuthorizedException extends BaseRpcException {
    public constructor(error: string | object)
    {
        super(401, 'Unauthorized', error);
    }
}