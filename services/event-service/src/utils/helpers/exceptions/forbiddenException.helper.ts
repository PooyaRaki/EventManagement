import { BaseRpcException } from './baseRpcException.helper';

export class ForbiddenException extends BaseRpcException {
    public constructor(error: string | object)
    {
        super(403, 'Forbidden', error);
    }
}