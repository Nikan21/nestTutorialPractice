import { Model,Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UsersRoles } from "./users-roles.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string

    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @BelongsToMany( () => User, () => UsersRoles )
    users: User[]
}
