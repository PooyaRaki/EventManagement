import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FastifyReply } from 'fastify';
import { ApiContract, ResponseMeta } from '@utils/interfaces';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiContract<T>> {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<ApiContract<T>> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const status = this.manipulateStatusCode(response);
        const meta = this.buildMetaData(status);

        return next.handle().pipe(
            map((data: any) => {
                return Object.assign(data, {
                    meta,
                });
            }),
        );
    }

    
    /**
     * Changed default POST statusCode from 201 to 200
     *
     * @param  {FastifyReply} response Response object
     *
     * @returns {number} New status code
     */
    private manipulateStatusCode(response: FastifyReply): number
    {
        const statusCode = (response.statusCode === 201) ? 200 : response.statusCode;
        response.status(statusCode);

        return statusCode;
    }

    /**
     * Builds response metadata
     *
     * @param  {number} status Status code
     *
     * @returns {ResponseMeta} Response meta data
     */
    private buildMetaData(status: number): ResponseMeta
    {
        return {
            date: new Date(),
            statusCode: status,
        };
    }
}
