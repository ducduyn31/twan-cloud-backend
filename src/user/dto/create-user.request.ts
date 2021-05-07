import {IsEmail, MinLength} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;

    @MinLength(12)
    sn: string;

    @MinLength(8)
    boxPassword: string;
}
