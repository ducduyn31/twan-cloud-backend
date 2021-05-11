import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.request';
import {Observable, of} from 'rxjs';
import {User} from './dto/user';
import {ModuleRef} from '@nestjs/core';

@Injectable()
export class UserService {

    constructor(/*private db: DatabaseService, private auth: AuthService*/private modules: ModuleRef) {
        // this.db.getDatabase().registerModel(User);
    }

    public createUser(user: CreateUserDto): Observable<User> {

        // console.log(this.auth);
        console.log(this.modules.get(UserService));
        return of();
    }

}
