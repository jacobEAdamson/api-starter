import { Get, Post, Controller, Body } from '@nestjs/common';
import { ValidationError, ValidationErrorItem } from 'sequelize';
import { Model, Repository } from 'sequelize-typescript';

@Controller()
export class BaseController {
  constructor() {}

  @Get()
  public async index() {
    return JSON.stringify(
      await this.modelClass().findAll({ limit: 10, offset: 0 }),
    );
  }

  @Post()
  async create(@Body() body: any): Promise<string> {
    let errors: ValidationErrorItem[] = null;
    let model: any;
    try {
      model = await this.modelClass().create(body);
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

  modelClass(): Repository<Model<any, any>> {
    throw Error('Not implemented');
  }
}
