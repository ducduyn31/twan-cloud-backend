import {Injectable} from '@nestjs/common';
import {DatabaseService} from '../database/database.service';
import {CreateUserDto} from './dto/create-user.request';
import {Observable, of} from 'rxjs';
import {User} from './dto/user';

@Injectable()
export class UserService {

    constructor(private db: DatabaseService) {
        this.db.getDatabase().registerModel(User);
    }

    public createUser(user: CreateUserDto): Observable<CreateUserDto> {
        // @ts-ignore
        console.log('%o', this.db.getDatabase().getModel(User));
        return of(user);
    }

}
