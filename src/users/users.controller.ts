import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
/* import { ValidationPipe } from 'src/pipes/validation.pipe'; */


@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}
    //Only authorized users can see list of users
    /* @UseGuards(JwtAuthGuard) */

    //Only admins can see list of users
/*     @Roles('Admin')
    @UseGuards(RolesGuard) */

    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }
    //Validation
    /* @UsePipes(ValidationPipe) */

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }

    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() addRoleDto: AddRoleDto) {
        return this.userService.addRole(addRoleDto);
    }

    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post('/ban')
    banUser(@Body() banUserDto: BanUserDto) {
        return this.userService.ban(banUserDto);
    }

}
