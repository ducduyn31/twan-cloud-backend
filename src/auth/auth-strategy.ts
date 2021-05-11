import {Observable} from 'rxjs';

export interface AuthStrategy<AuthOptions, Result, Criteria> {

    register(options: AuthOptions): Result | Promise<Result> | Observable<Result>;

    verifyLogin(criteriaToken: Criteria): boolean | Observable<boolean> | Promise<boolean>;

}
