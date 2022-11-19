import { ForbiddenException } from './forbidden.exception';

describe('ForbiddenException', () => {
    test('Should throw 403 exception', () => {
        try {
            throw new ForbiddenException({ name: 'MY TEST 403' });
        } catch (error: any) {
            expect(error.statusCode).toBe(403);
            expect(error.error).toHaveProperty('name');
            expect(error.error.name).toBe('MY TEST 403');
        }
    });
})