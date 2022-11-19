import { DataSource } from 'typeorm';
import { AppDatabaseConfig } from './index';

export default new DataSource(AppDatabaseConfig);