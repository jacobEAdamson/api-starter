import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { UserController } from './user.controller';
import { Sequelize } from 'sequelize-typescript';
import UserModel from './user.model';
import { SEQUELIZE_PROVIDER } from './database.providers';

describe('UserController', () => {
  let app: TestingModule;
  let userController: UserController;
  let sequelize: Sequelize;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userController = app.get(UserController);
    sequelize = app.get(SEQUELIZE_PROVIDER);
    await sequelize.sync({ force: true });
  });

  describe('index', () => {
    it('should return an empty list when no records', async () => {
      expect(JSON.parse(await userController.index())).toEqual([]);
    });

    it('should return ids of records when they exist', async () => {
      const userModel = sequelize.getRepository(UserModel);
      userModel.create({ name: 'Jacob Adamson' });
      const result = JSON.parse(await userController.index());
      expect(result.find((o) => o['name'] == 'Jacob Adamson')).toBeTruthy();
    });
  });

  describe('create', () => {
    it('should allow creating a user with the correct paramters', async () => {
      const result = JSON.parse(
        await userController.create({
          name: 'Jacob Adamson',
        }),
      );
      expect(result['result']).toEqual('success');
    });

    it('should properly validate', async () => {
      const result = JSON.parse(
        await userController.create({
          name: '',
        }),
      );
      expect(result['result']).toEqual('error');
      expect(result['errors'][0]['message']).toContain(
        'Validation notEmpty on name failed',
      );
    });
  });
});
