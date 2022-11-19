import { BadRequestException } from '@utils/exceptions';
import {
    HASH,
    hashAlgos,
} from './hash.helper';

describe('Creating Hash String', () => {
    test('Should return SHA512 hash of a given string', async () => {
        const input = 'this is the hashed string';
        const secret = 'this is the secret key';

        const result = await HASH({
            data: input,
            secret: secret,
            algo: hashAlgos.SHA512,
        });

        const output = 'dc909b76790107def0a3f2f84f902f7539648d45e627c1566b17f98db1f3bd9b5a016aaad401e6ce11e8d32dc20c4d154e554f98ffb1a909ae85bedf0c31f41d';

        expect(result).toBe(output);
    });
    test('Should return SHA256 hash of a given string', async () => {
        const input = 'this is the hashed string';
        const secret = 'this is the secret key';

        const result = await HASH({
            data: input,
            secret: secret,
            algo: hashAlgos.SHA256,
        });

        const output = 'fb233c3e819b25a7b3de5baa366e1aebf7f9ca187ce7e2d8842c1bfc1751fe2f';

        expect(result).toBe(output);
    });

    test('Should throw if the given string is empty', async () => {
        const input = '';
        const secret = '';

        const result = HASH({
            data: input,
            secret: secret,
            algo: hashAlgos.SHA512,
        });

        expect(result).rejects.toThrow(BadRequestException);
    });
});