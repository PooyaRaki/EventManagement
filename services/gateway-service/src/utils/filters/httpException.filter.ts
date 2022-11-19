import { FastifyRequest, FastifyReply } from 'fastify';
import { ErrorContract, HttpError } from '@utils/interfaces';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from './exception.filter';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter implements ExceptionFilter {
    public catch(exception: HttpException, host: ArgumentsHost): ErrorContract
    {
        const ctx = host.switchToHttp();

        return this.sendResponse({
            stack: exception.stack,
            request: ctx.getRequest<FastifyRequest>(),
            response: ctx.getResponse<FastifyReply>(),
            error: <HttpError> exception.getResponse(),
        });
    }
}
