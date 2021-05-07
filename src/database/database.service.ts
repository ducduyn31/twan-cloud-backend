import {Provider} from '@nestjs/common';
import {DatabaseType} from './database.type';

export class DatabaseService {
    constructor(type: DatabaseType) {
    }

    static forFirebase(): Provider<DatabaseService> {
        return {
            provide: DatabaseService,
            useFactory: () => new DatabaseService(DatabaseType.Firebase)
        };
    }
}
