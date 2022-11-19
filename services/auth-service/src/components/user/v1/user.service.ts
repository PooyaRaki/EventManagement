import { Repository } from 'typeorm';
import { Status } from '@utils/enums';
import { UserConfig } from '@utils/configs';
import { Injectable } from '@nestjs/common';
import { SystemMessage } from '@utils/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './enums';
import { TokenService } from './token.service';
import { User } from '@components/user/v1/entities';
import { BadRequestException, NotFoundException } from '@utils/exceptions';
import { IUserLoginResponse } from '@components/user/v1/interfaces';
import {
    SHA512,
    RandomString,
} from '@utils/helpers';
import {
    LoginUserPayload,
    UpdateUserPayload,
    CreateUserPayload,
    FindAllUsersPayload,
} from '@components/user/v1/payloads';

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly tokenService: TokenService,
    ) {
        //
    }

    /**
     * Creates a new user
     *
     * @param  {CreateUserPayload} input User creation data
     *
     * @returns {Promise<User>} Newly created user object
     */
    public async createUser(input: CreateUserPayload): Promise<User>
    {
        return await this.create(input, Role.User);
    }

    /**
     * Creates a new admin
     *
     * @param  {CreateUserPayload} input User creation data
     *
     * @returns {Promise<User>} Newly created user object
     */
    public async createAdmin(input: CreateUserPayload): Promise<User>
    {
        return await this.create(input, Role.Admin);
    }

    /**
     * Creates a new user
     *
     * @param  {CreateUserPayload} input User creation data
     * @param  {Role} role User role
     *
     * @returns {Promise<User>} Newly created user object
     */
    private async create(input: CreateUserPayload, role: Role): Promise<User>
    {
        await this.validateUserCreation(input);

        const salt = await RandomString(64);
        const hashedPassword = await this.saltifyHashPassword(salt, input.password);

        return await this.userRepository.save({
            salt: salt,
            role: role,
            email: input.email,
            phone: input.phone,
            status: Status.ACTIVE,
            password: hashedPassword,
        });
    }

    /**
     * Validates user create request
     *
     * @param  {CreateUserPayload} input Request user data
     *
     * @returns {Promise<void>}
     */
    private async validateUserCreation(input: CreateUserPayload): Promise<void>
    {
        await this.validatePasswordConfirmation(input);
        await this.validateUserDuplicateCredential(input);
    }

    /**
     * Validates whether ths password and its confirmation are the same or not
     *
     * @param  {Pick<CreateUserPayload, 'password' | 'passwordConfirm'>} input Password data
     *
     * @returns {Promise<void>}
     */
    private async validatePasswordConfirmation(
        input: Pick<CreateUserPayload, 'password' | 'passwordConfirm'>
    ): Promise<void> {
        if (input.password !== input.passwordConfirm) {
            throw new BadRequestException(SystemMessage.PASSWORD_CONFIRMATION_FAILED);
        }
    }

    /**
     * Updates a user
     *
     * @param  {UpdateUserPayload} input User data
     *
     * @returns {Promise<User>} User object
     */
    public async update(input: UpdateUserPayload): Promise<User>
    {
        await this.validateUserUpdate(input);
        const user = await this.findByIdOrFail(input.id);

        return this.userRepository.save({
            ...user,
            ...input,
        })
    }

    /**
     * Validate user update request
     *
     * @param  {UpdateUserPayload} input User data
     *
     * @returns {Promise<void>}
     */
    private async validateUserUpdate(input: UpdateUserPayload): Promise<void>
    {
        if (input.email && input.email !== '') {
            await this.validateUserDuplicateCredential({ email: input.email });
        }
    }

    /**
     * Checks if the sent email is already exists or not
     *
     * @param  {Pick<User, 'email'>} input Input data
     *
     * @returns {Promise<void>}
     */
    private async validateUserDuplicateCredential(
        input: Pick<User, 'email'>
    ): Promise<void> {
        if (await this.findDuplicateCredential(input) !== null) {
            throw new BadRequestException(SystemMessage.EMAIL_DUPLICATE);
        }
    }

    /**
     * Finds duplicate user credentials
     *
     * @param  {Pick<User, 'email'>} input Input data
     *
     * @returns {Promise<User | null>} User object or null if the email does not exist
     */
     private async findDuplicateCredential(
        input: Pick<User, 'email'>
    ): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { email: input.email },
        });
    }

    /**
     * Finds a user by id
     *
     * @param  {number} id User id
     *
     * @returns {Promise<User | null>} User object or if the id is invalid null
     */
    public async findById(id: number): Promise<User | null>
    {
        return await this.userRepository.findOne({
            where: { id },
        });
    }

    /**
     * Finds a user by id
     *
     * @param  {number} id User id
     *
     * @returns {Promise<User>} User object
     * @throws {NotFoundException} If the id is invalid throws
     */
    public async findByIdOrFail(id: number): Promise<User>
    {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException(SystemMessage.USER_NOT_FOUND);
        }

        return user;
    }

    /**
     * Finds a user by the Auth header sent in request
     *
     * @param  {string} token Token
     *
     * @returns {Promise<User | null>} User object or null
     */
    public async findByToken(token: string): Promise<User | null>
    {
        const userInToken = await this.tokenService.decodeToken(this.removeTokenType(token));

        return await this.findById(userInToken.id);
    }

    /**
     * Finds a user by the Auth header sent in request
     *
     * @param  {string} token Token
     *
     * @returns {Promise<User>} User object
     * @throws {BadRequestException} If token is invalid throws an error
     */
    public async findByTokenOrFail(token: string): Promise<User>
    {
        const user = await this.findByToken(token);

        if (!user) {
            throw new BadRequestException(SystemMessage.CREDENTIAL_INVALID);
        }

        return user;
    }

    /**
     * Returns all the users
     *
     * @param  {FindAllUsersPayload} input Input data
     *
     * @returns {User[]} User objects
     */
    public async findAll(input: FindAllUsersPayload): Promise<User[]>
    {
        return await this.userRepository.find({
            take: input.limit,
            skip: input.offset,
        });
    }

    /**
     * Creates hash string of a salty password
     *
     * @param  {string} salt Salt
     * @param  {string} password Raw password
     *
     * @returns {Promise<string>}
     */
    private async saltifyHashPassword(salt: string, password: string): Promise<string>
    {
        const saltyPassword = await this.saltifyPassword(salt, password);

        return SHA512(saltyPassword, UserConfig.passwordSalt);
    }

    /**
     * Logins a user
     *
     * @param  {LoginUserDto} input User credential
     *
     * @returns {Promise<IUserLoginResponse>} User login response
     * @throws {NotFoundException} If the user is not found throws an error
     */
    public async login(input: LoginUserPayload): Promise<IUserLoginResponse>
    {
        const user = await this.findUserCredentialByEmailOrFail(input.email);
        await this.validateUserCredential(user, input.password);

        return {
            user: {
                id: user.id,
                email: user.email,
            },
            token: await this.tokenService.createTokenResponse(user),
        };
    }

    /**
     * Validates user credentials
     *
     * @param  {User} user User object
     * @param  {string} password User Password
     *
     * @returns {Promise<void>}
     */
    private async validateUserCredential(user: User, password: string): Promise<void>
    {
        const hashedPassword = await this.saltifyHashPassword(user.salt, password);

        if (hashedPassword !== user.password) {
            throw new BadRequestException(SystemMessage.CREDENTIAL_INVALID);
        }
    }

    /**
     * Finds a user by its credentials
     *
     * @param  {string} email User email
     *
     * @returns {Promise<User>} User object
     * @throws {NotFoundException} If the user is not found throws an error
     */
     public async findUserByEmailOrFail(email: string): Promise<User>
     {
         const user = await this.findUserByEmail(email);
 
         if (!user) {
             throw new NotFoundException(SystemMessage.USER_NOT_FOUND);
         }
 
         return user;
     }

    /**
     * Finds a user by its credentials
     *
     * @param  {string} email User email
     *
     * @returns {Promise<User>} User object
     * @throws {NotFoundException} If the user is not found throws an error
     */
     public async findUserCredentialByEmailOrFail(email: string): Promise<User>
     {
         const user = await this.findUserCredentialByEmail(email);
 
         if (!user) {
             throw new BadRequestException(SystemMessage.CREDENTIAL_INVALID);
         }
 
         return user;
     }

    /**
     * Finds a user by its credentials
     *
     * @param  {string} email User email
     *
     * @returns {Promise<User>} User object
     */
    public async findUserByEmail(email: string): Promise<User | null>
    {
        return await this.userRepository.findOne({
            where: { email },
        });
    }

    /**
     * Finds a user credentials by its credentials
     *
     * @param  {string} email User email
     *
     * @returns {Promise<User>} User object
     */
    public async findUserCredentialByEmail(email: string): Promise<User | null>
    {
        return await this.userRepository.findOne({
            select: [ 'id', 'email', 'password', 'salt' ],
            where: { email },
        });
    }

    /**
     * Adds some salt to password to make it delicious :)
     *
     * @param  {string} salt Password salt
     * @param  {string} password User password
     *
     * @returns {Promise<string>} The formatted password
     */
    private async saltifyPassword(salt: string, password: string): Promise<string>
    {
        return `${salt}${password}${salt}`;
    }

    private removeTokenType(token: string): string
    {
        return token.split(' ')[1];
    }
}