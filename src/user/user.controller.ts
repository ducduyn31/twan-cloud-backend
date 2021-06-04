import {Body, Controller, Get, HttpException, HttpStatus, Req} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.request';
import {UserService} from './user.service';
import {Request} from 'express';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    public async registerUser(@Body() user: CreateUserDto) {
        try {
            await this.userService.createUser(user);
        } catch (e) {
            throw new HttpException({
                code: e.code,
                message: e.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    public async getToken(@Req() request: Request) {
        const username: string = request.header('Firebase-User');

        if (!username) {
            throw new HttpException({message: 'No user is provided in header. Please provide username under "Firebase-User"'}, HttpStatus.BAD_REQUEST);
        }

        return await this.userService.getToken(username);
    }
}
