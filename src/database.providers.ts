import { Sequelize } from 'sequelize-typescript';
import * as winston from 'winston';

import UserModel from './user.model';
import winstonLoggerConfig from './winston-logger.config';

const logger = winston.createLogger(winstonLoggerConfig);

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        database: 'some_db',
        dialect: 'sqlite',
        username: 'root',
        password: '',
        storage: ':memory:',
        repositoryMode: true,
        models: [UserModel],
        logging: (msg) => logger.info(msg),
      });
      await sequelize.sync();
      return sequelize;
    },
  },
];
