import {IsEmail, MinLength} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;

    @MinLength(12)
    cloudUsername: string;

    @MinLength(8)
    cloudPassword: string;
}
