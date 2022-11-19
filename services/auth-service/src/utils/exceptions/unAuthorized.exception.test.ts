import { UnAuthorizedException } from './unAuthorized.exception';

describe('UnAuthorizedException', () => {
    test('Should throw 401 exception', () => {
        try {
            throw new UnAuthorizedException({ name: 'MY TEST 401' });
        } catch (error: any) {
            expect(error.statusCode).toBe(401);
            expect(error.error).toHaveProperty('name');
            expect(error.error.name).toBe('MY TEST 401');
        }
    });
})