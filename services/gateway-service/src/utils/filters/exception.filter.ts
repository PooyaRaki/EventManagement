import { FastifyRequest } from 'fastify';
import { ErrorContract, IErrorResponseInput } from '@utils/interfaces';

export abstract class BaseExceptionFilter {

    /**
     * Sends response to the client
     *
     * @param  {IErrorResponseInput} input Input data
     *
     * @returns {ErrorContract} Error object
     */
    protected sendResponse(input: IErrorResponseInput): ErrorContract
    {
        const output = this.buildResponse(input);

        input.response
            .status(output.meta.statusCode)
            .header('Content-Type', this.fetchContentTypeFromHeader(input.request))
            .send(output);

        return output;
    }

    /**
     * Build error request
     *
     * @param  {IErrorResponseInput} input Input data
     *
     * @returns {ErrorContract} Error object
     */
    private buildResponse(input: IErrorResponseInput): ErrorContract
    {
        return {
            meta: {
                date: new Date(),
                stack: input.stack,
                path: input.request.url,
                statusCode: input.error.statusCode ?? 500,
            },
            errors: {
                key: input.error.error,
                message: input.error.message,
            },
        }
    }

    /**
     * returns content type from request header
     *
     * @param  {FastifyRequest} request Request
     *
     * @returns {string} Content type
     */
    private fetchContentTypeFromHeader(request: FastifyRequest): string
    {
        return <string> request.headers['content-type'] ?? 'application/json';
    }
}