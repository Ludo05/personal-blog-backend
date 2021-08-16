import config from 'config';

export const PORT: number = 9001;
export const MONGODB_CONNECTION_STRING: string = config.get('mongoDb.connectionString');
