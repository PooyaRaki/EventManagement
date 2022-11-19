/**
 * Returns base64 representation of a string
 *
 * @param  {string} string String to be encoded
 *
 * @returns {string} Base64 encoded string
 */
export const Base64Encode = (string: string): string => {
    return Buffer
        .from(string)
        .toString('base64');
}

/**
 * Decodes a base 64 string
 *
 * @param  {string} string String to be decoded
 *
 * @returns {string} Decoded string
 */
export const Base64Decode = (string: string): string => {
    return Buffer
        .from(string, 'base64')
        .toString('ascii');
}