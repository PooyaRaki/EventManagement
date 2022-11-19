import { MongooseModuleOptions } from '@nestjs/mongoose'

export type MongooseConfiguration = {
    url: string;
    options: MongooseModuleOptions;
}