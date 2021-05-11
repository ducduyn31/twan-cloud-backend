import {Observable} from 'rxjs';

export interface Model<T> {
    create(newModel: T): Observable<T>;

    getFirst(criteria: Partial<T>): Observable<T>;

    getAll(criteria: Partial<T>): Observable<T[]>;

    update(criteria: Partial<T>, updateData: Partial< T>): Observable<T[]> | Observable<T>;

    delete(criteria: Partial<T>): Observable<T[]> | Observable<T>;
}
