import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public async getHello(): Promise<string> {
    return 'Welcome to my Endpoint!';
  }
}
