import { BadRequestException } from '@utils/exceptions';

/**
 * Creates a random string
 *
 * @param  {number} length Length of the generated string
 * @param  {string} map Characters to create random from
 *
 * @returns {Promise<string>} Generated random string
 */
export const RandomString = async (
    length: number = 10,
    map: string = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^<>?":'|/\&*()_+`,
): Promise<string> => {
    await ValidateRandomStringInput(length, map);

    let result = '';
    const charactersLength = map.length;
    for (let index = 0; index < length; index++) {
        result += map.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }

    return result;
}

/**
 * Validates string length and map length
 *
 * @param  {number} length String length
 * @param  {string} map Map characters
 *
 * @returns {Promise<void>}
 * @throws {InvalidArgumentException} If the conditions are not correct throws an error
 */
const ValidateRandomStringInput = async (
    length: number,
    map: string,
): Promise<void> => {
    if (isNaN(length) || length < 1 || map === '') {
        throw new BadRequestException('Random string length must not be less than 1');
    }
}