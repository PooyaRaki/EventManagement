import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiContract } from '@utils/interfaces';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService,
  ) {
    //
  }

  @Get()
  public async getHello(): Promise<ApiContract<string>> {
    return { data: await this.appService.getHello() };
  }
}
