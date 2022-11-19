import { CacheModuleOptions } from '@nestjs/common';
import * as RedisStore from 'cache-manager-redis-store';

export const EventCacheConfig = <CacheModuleOptions> {
    store: <unknown> RedisStore.redisStore,
    socket: {
        host: process.env.REDIS_HOST,
        port: +(process.env.REDIS_PORT ?? 0),
    },
    password: process.env.REDIS_PASS,
    ttl: +(process.env.EVENT_CACHE_TTL || 1800),
};