import { HttpError } from '@utils/interfaces';
import { BaseRpcException } from '@utils/helpers/exceptions';
import {
    Observable,
    throwError,
} from 'rxjs';
import {
    Catch,
    HttpException,
    ExceptionFilter,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpValidationFilter implements ExceptionFilter {
    public catch(exception: HttpException): Observable<BaseRpcException> {
        const response = <HttpError> exception.getResponse();

        return throwError(() => this.buildResponse(response));
    }

    /**
     * Builds http error response
     *
     * @param  {HttpError} response Http error
     *
     * @returns {BaseRpcException} Returns rpc error
     */
    private buildResponse(response: HttpError): BaseRpcException
    {
        return new BaseRpcException(response.statusCode, response.message, response.error);
    }
}