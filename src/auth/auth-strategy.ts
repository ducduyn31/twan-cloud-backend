import {Observable} from 'rxjs';

export interface AuthStrategy<AuthOptions, Result, Criteria> {

    login(options: AuthOptions): any | Promise<any> | Observable<any>;

    register(options: AuthOptions): Result | Promise<Result> | Observable<Result>;

    delete(options: Partial<AuthOptions>): void | Promise<void> | Observable<void>;

    verifyLogin(criteriaToken: Criteria): any | Observable<any> | Promise<any>;

}
