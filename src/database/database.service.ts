import {Provider} from '@nestjs/common';
import {DatabaseType} from './database.type';
import {FirebaseDatabase} from '../firebase/interfaces/database/firebase-database';
import {Database} from './database.interface';
import {FirebaseMetadataStorage} from '../firebase/interfaces/storage/firebase-metadata-storage.interface';

export class DatabaseService {
    private static databaseTypes = {};

    constructor(private type: DatabaseType) {
    }

    static forFirebase(): Provider<DatabaseService> {
        return {
            provide: DatabaseService,
            useFactory: (store) => {
                DatabaseService.databaseTypes[DatabaseType.Firebase.toString()] = new FirebaseDatabase(store);
                DatabaseService.databaseTypes['__default'] = new FirebaseDatabase(store);
                return new DatabaseService(DatabaseType.Firebase);
            },
            inject: [FirebaseMetadataStorage]
        };
    }

    getDatabase<D>(): Database<D> {
        if (this.type) {
            return DatabaseService.databaseTypes[this.type];
        }
        return DatabaseService.databaseTypes['__default'];
    }

    static addType(name: string, database: Database<any>): void {
        DatabaseService.databaseTypes[name] = database;
    }
}
