import { SystemMessage } from '@utils/enums';
import {
    Model, ObjectId,
} from 'mongoose';
import {
    Profile,
    ProfileDocument,
} from '@components/profile/v1/models';
import {
    Injectable,
    BadRequestException,
} from '@nestjs/common';
import {
    FindProfilePayload,
    UPdateProfilePayload,
    CreateProfilePayload,
} from '@components/profile/v1/payloads';
import { InjectModel } from '@nestjs/mongoose';
import { Instrument } from '@components/instrument/v1/models';
// import { Instrument } from '@components/instrument/v1/models';

@Injectable()
export class ProfileService {
    public constructor (
        @InjectModel(Profile.name)
        private readonly profileModel: Model<ProfileDocument>,
    ) {
        //
    }

    /**
     * Creates a new Profile
     *
     * @param  {CreateProfilePayload} input Profile data
     *
     * @returns {Promise<Profile>} Newly created Profile object
     */
    public async create(userId: number, input: CreateProfilePayload): Promise<Profile>
    {
        await this.validateProfileExistence(userId);

        return await (await (new this.profileModel({...input, userId: userId}))
            .save()
        ).populate('instruments');
    }

    /**
     * Checks if the user has already created a profile throws an error
     *
     * @param  {number} userId UserId
     *
     * @returns {Promise<void>}
     */
    private async validateProfileExistence(userId: number): Promise<void>
    {
        const profile = await this.findByUserId(userId);

        if (profile) {
            throw new BadRequestException(SystemMessage.PROFILE_EXISTS);
        }
    }

    /**
     * Updates a Profile
     *
     * @param  {CreateProfilePayload} input Input Data
     *
     * @returns {Promise<UpdateWriteOpResult>} UpdateWriteResult
     */
    public async update(input: UPdateProfilePayload): Promise<Profile>
    {
        const result = await this.profileModel.findOneAndUpdate(input._id, input).populate('instruments');

        if (!result) {
            throw new BadRequestException(SystemMessage.UNKNOWN_ERROR);
        }

        return result;
    }

    /**
     * Returns all the Profiles
     *
     * @param  {FindProfilePayload} input Find criteria
     *
     * @returns {Promise<Profile[]>} Profile Objects
     */
    public async find(input: FindProfilePayload): Promise<Profile[]>
    {
        return await this.profileModel
            .find()
            .limit(input.limit)
            .skip(input.offset)
            .populate('instruments');
    }

    /**
     * Finds a profile by its id
     *
     * @param  {ObjectId} id Profile Id
     *
     * @returns {Promise<Profile | null>} Profile Object Or if profile id is invalid, null
     */
    public async findById(id: ObjectId): Promise<Profile | null>
    {
        return await this.profileModel.findById(id).populate('instruments');
    }

    /**
     * Finds a profile by its id
     *
     * @param  {ObjectId} id Profile Id
     *
     * @returns {Promise<Profile>} Profile Object
     * @throws {BadRequestException} If Profile id is invalid
     */
    public async findByIdOrFail(id: ObjectId): Promise<Profile>
    {
        const profile = await this.findById(id);

        if (!profile) {
            throw new BadRequestException(SystemMessage.PROFILE_NOT_FOUND);
        }

        return profile;
    }

    /**
     * Finds a user profile
     *
     * @param  {number} userId User id
     *
     * @returns {Promise<Profile | null>} Profile Object Or if profile id is invalid, null
     */
    public async findByUserId(userId: number): Promise<Profile | null>
    {
        return await this.profileModel.findOne({ userId }).populate('instruments', ['name', 'description']);
    }

    /**
     * Finds a user profile by its id
     *
     * @param  {number} userId User id
     *
     * @returns {Promise<Profile>} Profile Object
     * @throws {BadRequestException} If User id is invalid
     */
    public async findByUserIdOrFail(userId: number): Promise<Profile>
    {
        const profile = await this.findByUserId(userId);

        if (!profile) {
            throw new BadRequestException(SystemMessage.PROFILE_NOT_FOUND);
        }

        return profile;
    }

    public async addInstrument(userId: number, instrumentId: ObjectId): Promise<Profile>
    {
        const profile = await this.findByUserIdOrFail(userId);
        profile.instruments.push(<Instrument> { _id: instrumentId });

        return (await (new this.profileModel(profile)).save()).populate('instruments');
    }
}