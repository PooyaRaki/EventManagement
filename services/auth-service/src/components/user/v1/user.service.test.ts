import { TestingModule } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateUserPayload } from './payloads';
import { UserModuleV1Test } from './userTest.module';
import { UserService } from './user.service';
import { BadRequestException } from '@utils/exceptions';

let connection: DataSource;
let moduleRef: TestingModule;
let userService: UserService;

const validEmail = 'valid@test.com';
const validEmail2 = 'valid2@test.com';
const validEmail3 = 'valid3@test.com';
// const invalidEmail = 'invalid@test.com';
// const invalidEmailPattern = 'InvalidEmail';
const validPassword = '1234567890';
// const invalidPassword = 'INVALID';

describe('UserService', () => {
    beforeAll(async () => {
        moduleRef = await UserModuleV1Test();
        connection = await moduleRef.get(getDataSourceToken());
    });
    beforeEach(async () => {
        userService = moduleRef.get<UserService>(UserService);
    });
    afterAll(async () => {
        connection.destroy();
    });

    test('Should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('createUser', () => {
        test('Should create a user with Correct data provided', async() => {
            const data: CreateUserPayload = {
                email: validEmail,
                password: validPassword,
                passwordConfirm: validPassword,
            };

            const result = await userService.createUser(data);

            expect(result).toBeDefined();
            expect(result).toHaveProperty('id');
        });

        test('Should throw when passwords do not match', async () => {
            const data: CreateUserPayload = {
                email: validEmail2,
                password: validPassword,
                passwordConfirm: 'INVALID_PASSWORD',
            };

            const result = userService.createUser(data);

            await expect(result).rejects.toThrowError();
        });

        test('Should throw when duplicate email is provided', async () => {
            const data: CreateUserPayload = {
                email: validEmail3,
                password: validPassword,
                passwordConfirm: validPassword,
            };

            const result = userService.createUser(data);
            const resultDuplicate = userService.createUser(data);

            await expect(result).resolves.toHaveProperty('id');
            await expect(resultDuplicate).rejects.toThrowError(BadRequestException);
        });
    });

    describe('Login', () => {
        test('Should Login with Correct Credentials', async () => {
            const data: CreateUserPayload = {
                email: 'login@localhost.com',
                password: validPassword,
                passwordConfirm: validPassword,
            };

            const resultRegister = await userService.createUser(data);
            const resultLogin = await userService.login({
                email: data.email,
                password: data.password,
            });

            expect(resultRegister).toHaveProperty('id');
            expect(resultLogin).toHaveProperty('user');
        });
        test('Should Not Login with InCorrect Credentials', async () => {
            const input = {
                email: 'invalid@localhost.com',
                password: 'INVALID_PASSWORD',
            };

            const result = userService.login(input);

            await expect(result).rejects.toThrowError(BadRequestException);
        });
    });
});