import { NotFoundException } from './notFound.exception';

describe('NotFoundException', () => {
    test('Should throw 404 exception', () => {
        try {
            throw new NotFoundException({ name: 'MY TEST 404' });
        } catch (error: any) {
            expect(error.statusCode).toBe(404);
            expect(error.error).toHaveProperty('name');
            expect(error.error.name).toBe('MY TEST 404');
        }
    });
})