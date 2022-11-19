import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MessagePayload } from '@utils/decorators';
import { InstrumentService } from './instrument.service';
import { Instrument } from './models';
import { CreateInstrumentPayload, UpdateInstrumentPayload } from './payloads';

@Controller()
export class InstrumentController {
    public constructor(
        private readonly instrumentService: InstrumentService,
    ) {
        //
    }

    @MessagePattern('instrument.v1.create')
    public async create(
        @MessagePayload() payload: CreateInstrumentPayload,
    ): Promise<Instrument> {
        return await this.instrumentService.create(payload);
    }

    @MessagePattern('instrument.v1.update')
    public async update(
        @MessagePayload() payload: UpdateInstrumentPayload,
    ): Promise<Instrument> {
        return await this.instrumentService.update(payload);
    }

    @MessagePattern('instrument.v1.find')
    public async find(): Promise<Instrument[]> {
        return await this.instrumentService.find();
    }
}