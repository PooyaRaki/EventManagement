import {
    throwError,
    Observable,
} from 'rxjs';
import {
    Catch,
    RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcValidationFilter implements RpcExceptionFilter<RpcException> {
    public catch(exception: RpcException): Observable<RpcException> {
        return throwError(() => exception);
    }
}