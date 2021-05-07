import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.request';
import {UserService} from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Post()
    public registerUser(@Body() user: CreateUserDto) {
        this.userService.
    }
}
