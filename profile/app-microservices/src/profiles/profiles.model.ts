import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ProfileCreationAttr {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userId: number;
}

@Table({tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCreationAttr> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  firstName: string;

  @Column({type: DataType.STRING, allowNull: false})
  lastName: string;

  @Column({type: DataType.STRING})
  phoneNumber: string;

  @Column({type: DataType.INTEGER, allowNull: false})
  userId: number;

}