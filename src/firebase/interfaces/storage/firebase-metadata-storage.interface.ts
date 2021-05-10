import {ClassProvider, FactoryProvider} from '@nestjs/common';
import {IMetadataStore} from 'fireorm/lib/src/MetadataUtils';
import {MetadataStorage} from 'fireorm/lib/src/MetadataStorage';

const getStore = (): IMetadataStore => {
    return global as never;
}

const initializeMetadataStorage = (): void => {
    const store = getStore();

    if (!store.metadataStorage) {
        store.metadataStorage = new MetadataStorage()
    }
}

export class FirebaseMetadataStorage {

    private _storage: MetadataStorage = getStore().metadataStorage;

    constructor() {
        initializeMetadataStorage();
    }

    getStorage(): MetadataStorage {
        return this._storage;
    }
}

export const FirebaseMetadataStorageProvider: FactoryProvider = {
    provide: FirebaseMetadataStorage,
    useFactory: () => new FirebaseMetadataStorage(),
}
