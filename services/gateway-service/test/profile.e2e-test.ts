import { AuthModuleV1 } from '@components/auth/v1';
import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

describe('AuthController (e2e)', () => {
    let app: NestFastifyApplication;
    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AuthModuleV1],
        }).compile();

        app = moduleRef.createNestApplication<NestFastifyApplication>(
            new FastifyAdapter(),
        );

        await app.init();
        await app.getHttpAdapter().getInstance().ready();
    });

    test(`Should login with correct credentials`, async () => {
    return app
        .inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
            email: "admin@localhost.com",
            password: "1234567890",
        }
        })
        .then((result) => {
            const payload = JSON.parse(result.payload);

            expect(result.statusCode).toEqual(201);
            expect(payload).toHaveProperty('data');
            expect(payload.data).toHaveProperty('user');
        });
    });
    test(`Should return 401 with wrong email`, async () => {
    return app
        .inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
            email: "WrongEmail",
            password: "1234567890",
        }
        })
        .catch((result) => {
            expect(result.statusCode).toEqual(400);
        });
    });
    test(`Should return 401 with wrong password`, async () => {
    return app
        .inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
            email: "admin@localhost.com",
            password: "WRONG",
        }
        })
        .catch((result) => {
            expect(result.statusCode).toEqual(400);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
