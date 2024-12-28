import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class UserModel extends Model {
  @Column({
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  name: string;

  @Column
  birthday: Date;
}
