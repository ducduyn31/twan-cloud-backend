import {AuthStrategy} from './auth-strategy';
import {Provider} from '@nestjs/common';

export class AuthService {

    register: (options: any) => Promise<{uid: string, email: string}>;
    deleteAuth: (options: any) => Promise<{uid: string, email: string}>;
    login: (options: any) => Promise<any>;
    verify: (options: any) => Promise<any>;

    // @ts-ignore
    constructor(private strategy: AuthStrategy){
        this.register = this.strategy.register;
        this.deleteAuth = this.strategy.delete;
        this.login = this.strategy.login;
        this.verify = this.strategy.verifyLogin;
    }

    static forStrategy(strategy: AuthStrategy<any, any, any>): Provider {
        return {
            provide: AuthService,
            useFactory: () => new AuthService(strategy),
        }
    }
}
