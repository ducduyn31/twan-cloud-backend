import {Model} from '../../../database/model.interface';
import {asapScheduler, Observable, scheduled} from 'rxjs';
import {getRepository, IEntity, IEntityConstructor} from 'fireorm';
import {CONTAINS} from 'class-validator';

export class FirebaseCollection<M extends IEntity & Object> implements Model<M>{

    constructor(private modelConstructor: IEntityConstructor) {
        console.log(modelConstructor);
    }

    create(newModel: M): Observable<M> {
        return scheduled(getRepository<M>(newModel.constructor.prototype).create(newModel), asapScheduler);
    }

    delete(criteria: Partial<M>): Observable<M[]> | Observable<M> {
        return undefined;
    }

    getAll(criteria: Partial<M>): Observable<M[]> {
        return undefined;
    }

    findById(criteria: Partial<M>): Observable<M> {
        return undefined;
    }

    update(criteria: Partial<M>, updateData: Partial<M>): Observable<M[]> | Observable<M> {
        return undefined;
    }

}
