import { Controller, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Memoize } from 'typescript-memoize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import UserModel from './user.model';
import { BaseController } from './base-controller';
import { SEQUELIZE_PROVIDER } from './database.providers';

@Controller('users')
export class UserController extends BaseController {
  constructor(
    @Inject(SEQUELIZE_PROVIDER) private sequelize: Sequelize,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(logger);
  }

  @Memoize()
  public modelRepo() {
    return this.sequelize.getRepository(UserModel);
  }
}
