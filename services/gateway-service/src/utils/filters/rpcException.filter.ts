import { RpcException } from '@nestjs/microservices';
import { BaseExceptionFilter } from './exception.filter';
import { ErrorContract, RpcError } from '@utils/interfaces';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch(RpcException)
export class RpcExceptionFilter extends BaseExceptionFilter implements ExceptionFilter {
    public catch(exception: RpcException, host: ArgumentsHost): ErrorContract
    {
        const ctx = host.switchToHttp();

        return this.sendResponse({
            stack: exception.stack,
            request: ctx.getRequest<FastifyRequest>(),
            response: ctx.getResponse<FastifyReply>(),
            error: (<RpcError> exception.getError()).response,
        });
    }
}
