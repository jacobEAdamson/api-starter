import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Sequelize } from 'sequelize-typescript';
import UserModel from './user.model';
import { UserController } from './user.controller';

const sequelize = new Sequelize({
  database: 'some_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: ':memory:',
  repositoryMode: true,
  models: [UserModel],
});

@Module({
  controllers: [AppController, UserController],
  providers: [AppService, { useValue: sequelize, provide: 'sequelize' }],
})
export class AppModule {}
