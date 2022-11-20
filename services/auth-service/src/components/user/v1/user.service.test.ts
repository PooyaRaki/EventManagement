import { DataSource } from 'typeorm';
import { UserService } from './user.service';
import { CreateUserPayload } from './payloads';
import { TestingModule } from '@nestjs/testing';
import { UserModuleV1Test } from './userTest.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { BadRequestException } from '@utils/exceptions';

let connection: DataSource;
let moduleRef: TestingModule;
let userService: UserService;

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
                email: 'valid@test.com',
                password: '1234567890',
                passwordConfirm: '1234567890',
            };

            const result = await userService.createUser(data);

            expect(result).toBeDefined();
            expect(result).toHaveProperty('id');
        });

        test('Should throw when passwords do not match', async () => {
            const data: CreateUserPayload = {
                email: 'valid2@test.com',
                password: '1234567890',
                passwordConfirm: 'INVALID_PASSWORD',
            };

            const result = userService.createUser(data);

            await expect(result).rejects.toThrowError();
        });

        test('Should throw when duplicate email is provided', async () => {
            const data: CreateUserPayload = {
                email: 'valid3@test.com',
                password: '1234567890',
                passwordConfirm: '1234567890',
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
                password: '1234567890',
                passwordConfirm: '1234567890',
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