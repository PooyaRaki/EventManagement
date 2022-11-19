import { InjectModel } from '@nestjs/mongoose';
import {
    Model,
    ObjectId,
} from 'mongoose';
import {
    Instrument,
    InstrumentDocument,
} from '@components/instrument/v1/models';
import {
    Injectable,
    BadRequestException,
} from '@nestjs/common';
import {
    CreateInstrumentPayload,
    UpdateInstrumentPayload,
} from '@components/instrument/v1/payloads';
import { SystemMessage } from '@utils/enums';

@Injectable()
export class InstrumentService {

    public constructor(
        @InjectModel(Instrument.name)
        private readonly instrumentModel: Model<InstrumentDocument>,
    ) {
        //
    }

    /**
     * Creates a new instrument
     *
     * @param  {CreateInstrumentPayload} input Input Data
     *
     * @returns {Promise<Instrument>} Instrument Object
     */
    public async create(input: CreateInstrumentPayload): Promise<Instrument>
    {
        await this.validateInstrumentExistence(input.name);

        return (new this.instrumentModel(input)).save();
    }

    /**
     * Checks if the instrument has already been created
     *
     * @param  {string} name Instrument name
     *
     * @returns {Promise<void>}
     */
    private async validateInstrumentExistence(name: string): Promise<void>
    {
        const instrument = await this.findByName(name);

        if (instrument) {
            throw new BadRequestException(SystemMessage.INSTRUMENT_EXISTS);
        }
    }

    /**
     * Updates an instrument
     *
     * @param  {CreateInstrumentPayload} input Input Data
     *
     * @returns {Promise<UpdateWriteOpResult>} UpdateWriteResult
     */
     public async update(input: UpdateInstrumentPayload): Promise<Instrument>
     {
         const result = await this.instrumentModel.findOneAndUpdate(input._id, input);
 
         if (!result) {
             throw new BadRequestException(SystemMessage.UNKNOWN_ERROR);
         }
 
         return result;
     }

    /**
     * Returns all the instruments
     *
     * @returns {Promise<Instrument[]>} Instrument Objects
     */
    public async find(): Promise<Instrument[]>
    {
        return await this.instrumentModel.find();
    }

    /**
     * Finds an instrument by its id
     *
     * @param  {ObjectId} id Instrument Id
     *
     * @returns {Promise<Instrument | null>} Instrument Object Or if instrument id is not valid, null
     */
    public async findById(id: ObjectId): Promise<Instrument | null>
    {
        return this.instrumentModel.findById(id);
    }

    /**
     * Finds an instrument by its id
     *
     * @param  {ObjectId} id Instrument Id
     *
     * @returns {Promise<Instrument | null>} Instrument Object Or if instrument
     * @throws {BadRequestException} If instrument id is invalid
     */
    public async findByIdOrFail(id: ObjectId): Promise<Instrument>
    {
        const instrument = await this.findById(id);

        if (!instrument) {
            throw new BadRequestException(SystemMessage.INSTRUMENT_NOT_FOUND);
        }

        return instrument;
    }

    /**
     * Finds an instrument by its name
     *
     * @param  {string} name Instrument Name
     *
     * @returns {Promise<Instrument | null>} Instrument Object Or if instrument id is not valid, null
     */
    public async findByName(name: string): Promise<Instrument | null>
    {
        return await this.instrumentModel.findOne({ name });
    }

    /**
     * Finds an instrument by its name
     *
     * @param  {string} name Instrument name
     *
     * @returns {Promise<Instrument | null>} Instrument Object Or if instrument
     * @throws {BadRequestException} If instrument id is invalid
     */
    public async findByNameOrFail(name: string): Promise<Instrument>
    {
        const instrument = await this.findByName(name);

        if (!instrument) {
            throw new BadRequestException(SystemMessage.INSTRUMENT_NOT_FOUND);
        }

        return instrument;
    }
}