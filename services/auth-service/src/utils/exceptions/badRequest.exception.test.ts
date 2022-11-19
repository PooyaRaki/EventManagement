import { BadRequestException } from './badRequest.exception';

describe('BadRequestException', () => {
    test('Should throw 400 exception', () => {
        try {
            throw new BadRequestException({ name: 'MY TEST' });
        } catch (error: any) {
            expect(error.statusCode).toBe(400);
            expect(error.error).toHaveProperty('name');
            expect(error.error.name).toBe('MY TEST');
        }
    });
})