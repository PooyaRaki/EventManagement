import { RandomString } from "./randomString.helper";

describe('Create a random string', () => {
    test('Should create a random string', async () => {
        const length = 32;

        const result = await RandomString(length);

        expect(result).toHaveLength(length);
    });

    test('Should throw if the requested length is 0', async () => {
        const length = 0;

        const result = async () => RandomString(length);

        expect(result()).rejects.toThrow();
    });

    test('Should throw if the requested length is NaN', async () => {
        const length = NaN;

        const result = async () => RandomString(length);

        expect(result()).rejects.toThrow();
    });

    test('Should throw if the requested length is negative', async () => {
        const length = -1;

        const result = async () => RandomString(length);

        expect(result()).rejects.toThrow();
    });

    test('Should throw if the map is empty', async () => {
        const length = 10;
        const map = '';

        const result = async () => RandomString(length, map);

        expect(result()).rejects.toThrow();
    });

    test('Should throw if the map and length are empty', async () => {
        const length = NaN;
        const map = '';

        const result = async () => RandomString(length, map);

        expect(result()).rejects.toThrow();
    });
})