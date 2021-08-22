import config from 'config';

export const PORT: number = 9002;
export const MONGODB_CONNECTION_STRING: string = config.get('mongoDb.connectionString');
