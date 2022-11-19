import { validate } from 'class-validator';
import { IsFilledString } from './isFilledString.validator';

class TestClass {
    @IsFilledString()
    public myString: string;
}

describe('IsFilledString', () => {
    test('Should return an error if an empty string is passed', async () => {
        const input = new TestClass();
        input.myString = '';

        const result = await validate(input);

        expect(result.length).toBeGreaterThan(0);
    });
    test('Should pass if a non-empty string is passed', async () => {
        const input = new TestClass();
        input.myString = 'TEST';

        const result = await validate(input);

        expect(result.length).toEqual(0);
    });
})