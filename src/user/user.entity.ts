import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  role: string;
}