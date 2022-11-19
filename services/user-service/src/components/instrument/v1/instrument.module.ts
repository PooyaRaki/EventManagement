import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstrumentService } from '@components/instrument/v1/instrument.service';
import { InstrumentController } from '@components/instrument/v1/instrument.controller';
import {
    Instrument,
    InstrumentSchema,
} from '@components/instrument/v1/models';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Instrument.name,
                schema: InstrumentSchema,
            },
        ]),
    ],
    controllers: [
        InstrumentController,
    ],
    providers: [
        InstrumentService,
    ],
})
export class InstrumentModuleV1 {
    //
}