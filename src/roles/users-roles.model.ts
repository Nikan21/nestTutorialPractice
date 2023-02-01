import { Model,Column, DataType, Table, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";


@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UsersRoles extends Model<UsersRoles> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number
}
