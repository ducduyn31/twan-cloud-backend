import {Database} from '../../../database/database.interface';
import {Model} from '../../../database/model.interface';
import {firestore} from 'firebase-admin/lib/firestore';
import {FirebaseMetadataStorage} from '../storage/firebase-metadata-storage.interface';
import {Constructor, getRepository, IEntity, IEntityConstructor} from 'fireorm';
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
            throw new Error('Reference to model by name is not supported yet');
        }

        const repo = getRepository(model as unknown as IEntityConstructor);

        return repo as unknown as Model<M>;
    }
}
