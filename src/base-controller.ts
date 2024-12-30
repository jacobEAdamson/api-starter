import { Get, Post, Controller, Body, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationError, ValidationErrorItem } from 'sequelize';
import { Model, Repository } from 'sequelize-typescript';
import { Logger } from 'winston';

@Controller()
export class BaseController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {}

  @Get()
  public async index() {
    return JSON.stringify(await this.modelRepo().findAll());
  }

  @Post()
  public async create(@Body() body: any): Promise<string> {
    let errors: ValidationErrorItem[] = null;
    let model: any;
    try {
      model = await this.modelRepo().create(body);
    } catch (err: any) {
      if (err instanceof ValidationError) {
        errors = err.errors;
      } else {
        throw err;
      }
    }

    if (errors != null) {
      return JSON.stringify({
        result: 'error',
        errors: errors,
      });
    } else {
      return JSON.stringify({
        result: 'success',
        id: model.id,
      });
    }
  }

  public modelRepo(): Repository<Model<any, any>> {
    throw Error('Not implemented');
  }
}
