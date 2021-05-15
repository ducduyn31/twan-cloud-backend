import {Observable} from 'rxjs';

export interface Model<T> {
    create(newModel: T): Observable<T>;

    findById(criteria: any): Observable<T>;

    getAll(criteria: Partial<T>): Observable<T[]>;

    update(criteria: Partial<T>, updateData: Partial< T>): Observable<T[]> | Observable<T>;

    delete(criteria: Partial<T>): Observable<T[]> | Observable<T>;
}
