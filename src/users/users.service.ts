import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';


@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User, private rolesService: RolesService) {}

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}})
        return users
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = await this.userRepository.create(createUserDto)
        const role = await this.rolesService.getRoleByValue('User')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    async addRole(addRoleDto: AddRoleDto) {
        const user = await this.userRepository.findByPk(addRoleDto.userId)
        const role = await this.rolesService.getRoleByValue(addRoleDto.value)

        if(role && user) {
            await user.$add('role', role.id)
            return addRoleDto
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
    }

    async ban(banUserDto: BanUserDto) {
        const user = await this.userRepository.findByPk(banUserDto.userId)
        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        user.banned = true
        user.banReason = banUserDto.banReason
        await user.save()
        return user
    }

}
