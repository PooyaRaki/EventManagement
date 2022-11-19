export const AuthConfig = {
    cacheTtl: ~~(process.env.AUTH_CACHE_TTL || 600),
}