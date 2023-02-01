import { IsEmail, IsString, Length } from "class-validator"


export class CreateUserDto {
    @IsString({message: 'Must be a string'})
    @IsEmail({}, {message: 'Must be a valid email'})
    readonly email: string;
    @IsString({message: 'Must be a string'})
    @Length(4, 16, {message: 'Not less than 4 and not more than 16'})
    readonly password: string
}