import { Body, Controller, Get, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateInstrumentDto, UpdateInstrumentDto } from './dtos';
import { Instrument } from './interfaces';
import { MicroserviceMessageRequest, MicroserviceResponse } from '@utils/helpers';
import { AdminAuthGuard } from '@utils/guards/auth/admin.guard';
import { UserAuthGuard } from '@utils/guards/auth';
import { UserMicroserviceConfig } from '@utils/configs/microservices';
import { ApiContract } from '@utils/interfaces';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Instrument')
@ApiSecurity('X-Authorization')
@Controller({
    version: '1',
    path: 'instrument',
})
export class InstrumentController {
    public constructor(
        @Inject(UserMicroserviceConfig.name)
        private readonly instrumentService: ClientProxy,
    ) {
        //
    }

    @Post('/')
    @UseGuards(AdminAuthGuard)
    public async create(
        @Body() body: CreateInstrumentDto,
    ): Promise<ApiContract<Instrument>> {
        return {
            data: await MicroserviceResponse(
                MicroserviceMessageRequest<CreateInstrumentDto, Instrument>({
                    data: body,
                    client: this.instrumentService,
                    pattern: 'instrument.v1.create',
                }),
            ),
        }
    }

    @Put('/')
    @UseGuards(AdminAuthGuard)
    public async update(
        @Body() body: UpdateInstrumentDto,
    ): Promise<Instrument> {
        return await MicroserviceResponse(
            MicroserviceMessageRequest<UpdateInstrumentDto, Instrument>({
                data: body,
                client: this.instrumentService,
                pattern: 'instrument.v1.update',
            }),
        )
    }

    @Get('/')
    @UseGuards(UserAuthGuard)
    public async find(): Promise<ApiContract<Instrument[]>> {
        return {
            data: await MicroserviceResponse(
                MicroserviceMessageRequest<CreateInstrumentDto, Instrument[]>({
                    client: this.instrumentService,
                    pattern: 'instrument.v1.find',
                }),
            ),
        }
    }
}