import { FastifyCompressOptions } from '@fastify/compress';

export const CompressionConfig: FastifyCompressOptions =  {
    global: true,
    encodings: [
        'gzip',
        'deflate',
    ],
}