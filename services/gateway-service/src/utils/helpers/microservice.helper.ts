import { MicroserviceConfig } from '@utils/configs';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import {
    LanguageName,
    SystemMessage,
} from '@utils/enums';
import {
    UserInHeader,
    IMicroserviceMessage,
    IMicroserviceRequest,
    UserInHeaderOptional,
    IMicroserviceDefaultHeaders,
    RpcErrorResponse,
} from '@utils/interfaces';
import {
    of,
    timeout,
    catchError,
    Observable,
    TimeoutError,
    firstValueFrom,
} from 'rxjs';

/**
 * Turns microservice response to promise
 *
 * @param  {Observable<T>} source Response in form of an observable
 * @param  {number} timeoutSeconds Response timeout
 *
 * @returns {Promise<T>} Promisified response
 */
export const MicroserviceResponse = async <T>(source: Observable<T>, timeoutSeconds?: number): Promise<T> => {
        return await firstValueFrom(
            source
                .pipe(timeout(timeoutSeconds ?? MicroserviceConfig.timeout))
                .pipe(catchError(val => of(HandleMicroserviceError(val)))),
        );
}

/**
 * Handles microservice error
 *
 * @param  {object} error Error object
 *
 * @returns {Promise<never>}
 */
export const HandleMicroserviceError = async (error: RpcErrorResponse | TimeoutError): Promise<never> => {
    if (error instanceof TimeoutError) {
        throw new InternalServerErrorException(SystemMessage.CONNECTION_ERROR);
    }

    throw new HttpException(error, error.statusCode);
}

/**
 * Sends a microservice request
 *
 * @param  {IMicroserviceRequest} request Microservice Request data
 * 
 * @returns {Observable<TResult>} Microservice response
 */
export const MicroserviceMessageRequest = <TRequest extends object = {}, TResult extends object|string = {}> (
    request: IMicroserviceRequest<TRequest>
): Observable<TResult> => {
    return request.client.send<TResult, IMicroserviceMessage<TRequest>>(
        request.pattern,
        {
            data: request.data,
            headers: {
                ...MicroserviceDefaultHeaders(request.user, request.language),
                ...request.headers,
            },
        },
    );
}

/**
 * Default headers sent with each request
 *
 * @param  {UserInHeader | UserInHeaderOptional} user? User object
 * @param  {LanguageName} language? Language object
 *
 * @returns {IMicroserviceDefaultHeaders} Microservice default headers
 */
 export const MicroserviceDefaultHeaders = (
    user?: UserInHeader | UserInHeaderOptional,
    language?: LanguageName,
): IMicroserviceDefaultHeaders => {
    return {
        user: user,
        language: language,
    }
}