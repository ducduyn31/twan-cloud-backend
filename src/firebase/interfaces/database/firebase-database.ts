import {Database} from '../../../database/database.interface';
import {Model} from '../../../database/model.interface';
import {firestore} from 'firebase-admin/lib/firestore';
import {FirebaseMetadataStorage} from '../storage/firebase-metadata-storage.interface';
import {Constructor, IEntity, IEntityConstructor} from 'fireorm';
import {plural} from 'pluralize';
import Firestore = firestore.Firestore;

export class FirebaseDatabase implements Database<Firestore> {

    constructor(private metadataStorage: FirebaseMetadataStorage) {
    }

    registerModel<M>(model: { new (): M }): void {
        const name = plural(model.name);
        this.metadataStorage.getStorage().setCollection({
            name,
            entityConstructor: model as unknown as IEntityConstructor,
        });
    }

    getModel<M>(model: string | Constructor<M>): Model<M> {
        if (typeof model === 'string') {
            return undefined;
        }
        console.log(this.metadataStorage.getStorage().getCollection(model as unknown as IEntityConstructor))
        return undefined;
    }
}
