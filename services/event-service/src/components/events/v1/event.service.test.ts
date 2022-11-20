import { DataSource } from 'typeorm';
import { EventService } from './event.service';
import { TestingModule } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import { EventModuleV1Test } from './eventTest.module';
import { CreateEventPayload } from './payloads';
import { EventStatus } from './enums';

let connection: DataSource;
let moduleRef: TestingModule;
let eventService: EventService;

describe('UserService', () => {
    beforeAll(async () => {
        moduleRef = await EventModuleV1Test();
        connection = await moduleRef.get(getDataSourceToken());
    });
    beforeEach(async () => {
        eventService = moduleRef.get<EventService>(EventService);
    });
    afterAll(async () => {
        connection.destroy();
    });

    test('Should be defined', () => {
        expect(eventService).toBeDefined();
    });

    describe('create()', () => {
        test('Should create an event with valid payload', async() => {
            const userId = 1;
            const data: CreateEventPayload = {
                title: 'Violin #1',
                startedAt: new Date(),
                description: 'This is an event to gather Violinists from all over the world!',
            };

            const result = await eventService.create(userId, data);

            expect(result).toBeDefined();
            expect(result).toHaveProperty('id');
        });
        test('Event should be in onboarding state when first created', async() => {
            const userId = 1;
            const data: CreateEventPayload = {
                title: 'Violin #2',
                startedAt: new Date(),
                description: 'This is an event to gather Violinists from all over the world!',
            };

            const result = await eventService.create(userId, data);

            expect(result).toBeDefined();
            expect(result).toHaveProperty('id');
            expect(result.status).toBe(EventStatus.ONBOARDING);
        });
    });
    describe('find()', () => {
        test('Should return only 10 events from list', async() => {
            const userId = 1;
            const data: CreateEventPayload = {
                title: 'Violin #2',
                startedAt: new Date(),
                description: 'This is an event to gather Violinists from all over the world!',
            };

            for (let index = 0; index < 20; index++) {
                await eventService.create(userId, data);
            }

            const result = await eventService.find({
                limit: 10,
                offset: 0,
                status: EventStatus.ONBOARDING,
            });

            expect(result).toBeDefined();
            expect(result).toHaveLength(10);
        })
    });
    describe('findById()', () => {
        test('Should return an event by a valid id', async() => {
            const userId = 1;
            const data: CreateEventPayload = {
                title: 'Violin #2',
                startedAt: new Date(),
                description: 'This is an event to gather Violinists from all over the world!',
            };

            const event = await eventService.create(userId, data);
            const result = await eventService.findById(event.id);

            expect(result).toBeDefined();
            expect(result).toHaveProperty('id');
        });
        test('Should return null if the id is invalid', async() => {
            const result = await eventService.findById(90112);

            expect(result).toBeNull();
        });
    });
    describe('findByIdOrFail()', () => {
        test('Should return an event by a valid id', async() => {
            const userId = 1;
            const data: CreateEventPayload = {
                title: 'Violin #2',
                startedAt: new Date(),
                description: 'This is an event to gather Violinists from all over the world!',
            };

            const event = await eventService.create(userId, data);
            const result = await eventService.findByIdOrFail(event.id);

            expect(result).toBeDefined();
            expect(result).toHaveProperty('id');
        });
        test('Should throw if the id is invalid', async() => {
            const result = async () => await eventService.findByIdOrFail(90112);

            await expect(result).rejects.toThrowError();
        });
    });
    describe('findUserEvents()', () => {
        test('Should return 3 of user events', async() => {
            const userId = 1;
            const data: CreateEventPayload = {
                title: 'Violin #2',
                startedAt: new Date(),
                description: 'This is an event to gather Violinists from all over the world!',
            };

            for (let index = 0; index < 20; index++) {
                await eventService.create(userId, data);
            }
            const result = await eventService.findUserEvents(userId, {
                limit: 3,
                offset: 3,
                status: EventStatus.ONBOARDING,
            });

            expect(result).toBeDefined();
            expect(result).toHaveLength(3);
        });
        test('Should return an empty array if user id is invalid', async() => {
            const userId = 1000;
            const result = await eventService.findUserEvents(userId, {
                limit: 10,
                offset: 0,
                status: EventStatus.ONBOARDING,
            });

            expect(result).toBeDefined();
            expect(result).toHaveLength(0);
        });
    })
    describe('eventIsOnboarding()', () => {
        test('Should return true if the event is onboarding and event object is passed', async() => {
            const userId = 1;
            const data: CreateEventPayload = {
                title: 'Violin #2',
                startedAt: new Date(),
                description: 'This is an event to gather Violinists from all over the world!',
            };

            const event = await eventService.create(userId, data);

            const action = await eventService.eventIsOnboarding(event);

            expect(action).toEqual(true);
        });
        test('Should return true if the event is onboarding and event Id is passed', async() => {
            const userId = 1;
            const data: CreateEventPayload = {
                title: 'Violin #2',
                startedAt: new Date(),
                description: 'This is an event to gather Violinists from all over the world!',
            };

            const event = await eventService.create(userId, data);

            const action = await eventService.eventIsOnboarding(event.id);

            expect(action).toEqual(true);
        });
        test('Should throw if the event id is invalid', async() => {
            const action = async () => await eventService.eventIsOnboarding(9220);

            await expect(action).rejects.toThrowError();
        });
    });
});