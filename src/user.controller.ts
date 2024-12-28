import { Controller, Inject } from '@nestjs/common';
import UserModel from './user.model';
import { BaseController } from './base-controller';
import { Sequelize } from 'sequelize-typescript';

@Controller('users')
export class UserController extends BaseController {
  constructor(@Inject('sequelize') private sequelize: Sequelize) {
    super();
  }

  modelClass() {
    return this.sequelize.getRepository(UserModel);
  }
}
