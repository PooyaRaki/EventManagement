import { createHmac } from 'crypto';
import { BadRequestException } from '@utils/exceptions';

export enum hashAlgos {
    SHA1 = 'sha1',
    SHA256 = 'sha256',
    SHA512 = 'sha512',
}

interface CreateHash {
    data: string;
    secret: string;
    algo: hashAlgos;
}

/**
 * Creates hash of a given string
 *
 * @param  {CreateHash} input Hash input data
 *
 * @returns {Promise<string>} Hashed string of a given text
 */
export const HASH = async (input: CreateHash): Promise<string> => {
    if (input.data === '' || input.secret === '') {
        throw new BadRequestException('Invalid Argument! Hash expects data & secret');
    }
    
    return createHmac(input.algo, input.secret)
        .update(input.data)
        .digest('hex');
}

/**
 * Creates SHA512 hash of a given string
 *
 * @param  {string} data Data to be hashed
 * @param  {string} secret Hash secret
 *
 * @returns {Promise<string>} Hashed string
 */
export const SHA512 = async (data: string, secret: string): Promise<string> => {
    return await HASH({
        data,
        secret,
        algo: hashAlgos.SHA512,
    });
}

/**
 * Creates SHA5256 hash of a given string
 *
 * @param  {string} data Data to be hashed
 * @param  {string} secret Hash secret
 *
 * @returns {Promise<string>} Hashed string
 */
export const SHA256 = async (data: string, secret: string): Promise<string> => {
    return await HASH({
        data,
        secret,
        algo: hashAlgos.SHA256,
    });
}

/**
 * Creates SHA1 hash of a given string
 *
 * @param  {string} data Data to be hashed
 * @param  {string} secret Hash secret
 *
 * @returns {Promise<string>} Hashed string
 */
export const SHA1 = async (data: string, secret: string): Promise<string> => {
    return await HASH({
        data,
        secret,
        algo: hashAlgos.SHA1,
    });
}