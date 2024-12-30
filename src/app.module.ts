import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

import { AppController } from './app.controller';
import { UserController } from './user.controller';
import winstonLoggerConfig from './winston-logger.config';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    // SentryModule.forRoot(),
    WinstonModule.forRoot(winstonLoggerConfig),
  ],
  controllers: [AppController, UserController],
  providers: [
    ...databaseProviders,
    // { provide: APP_FILTER, useClass: AppExceptionFilter },
  ],
})
export class AppModule {}
